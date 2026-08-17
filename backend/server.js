const express = require('express');
const cors = require('cors');

// Khởi tạo ứng dụng Express
const app = express();
const PORT = 5000;

// Cấu hình Middleware
app.use(cors()); // Cho phép Frontend (chạy ở cổng 5173) gọi được dữ liệu từ Backend (cổng 5000)
app.use(express.json()); // Giúp Backend hiểu được dữ liệu định dạng JSON

// === Tạo API Endpoint ===

// 1. API kiểm tra server hoạt động
app.get('/', (req, res) => {
  res.send('Máy chủ Backend Quản lý Hợp đồng đang hoạt động tốt!');
});

// 2. API lấy danh sách công việc
app.get('/api/tasks', async (req, res) => {
  try {
    // 1. Kéo toàn bộ dữ liệu từ bảng tasks
    const { data: tasks, error: tasksError } = await supabase.from('tasks').select('*');
    if (tasksError) throw tasksError;

    // 2. Kéo toàn bộ dữ liệu từ bảng files
    const { data: files, error: filesError } = await supabase.from('files').select('*');
    if (filesError) throw filesError;

    // 3. Xử lý ghép nối: Nhét các file vào đúng công việc (task) của nó
    const formattedTasks = tasks.map(task => {
      return {
        id: task.id,
        userId: task.user_id,
        title: task.title,
        label: task.label,
        date: task.date_str, // Tương ứng cột date_str trong Database
        status: task.status,
        // Lọc ra những file có task_id trùng với id của task hiện tại
        files: files.filter(file => file.task_id === task.id)
      };
    });

    // 4. Trả dữ liệu đã ghép nối hoàn chỉnh về cho Frontend
    res.json(formattedTasks);
    
  } catch (error) {
    console.error("Lỗi khi kéo dữ liệu từ Supabase:", error);
    res.status(500).json({ error: 'Lỗi máy chủ Backend' });
  }
});
const multer = require('multer');
// Cấu hình Multer lưu file tạm vào RAM trước khi đẩy lên cloud
const upload = multer({ storage: multer.memoryStorage() });

// --- Cửa nhận hàng (API Upload File) ---

app.post('/api/upload', upload.single('pdfFile'), async (req, res) => {
  try {
    const file = req.file;
    const taskId = req.body.taskId; 
    
    if (!file) return res.status(400).json({ error: 'Không tìm thấy file tải lên!' });

    // 1. Dịch lại đúng font tiếng Việt do Multer làm lỗi
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');

    // 2. Chuyển đổi tên file sang chuẩn không dấu để đưa lên Cloud an toàn
    const safeName = originalName
      .normalize("NFD") // Tách dấu ra khỏi chữ
      .replace(/[\u0300-\u036f]/g, "") // Xóa toàn bộ dấu
      .replace(/đ/g, "d").replace(/Đ/g, "D") // Xử lý riêng chữ đ
      .replace(/[^a-zA-Z0-9.\-_]/g, "_"); // Đổi mọi ký tự đặc biệt và dấu cách thành gạch dưới

    const uniqueFileName = `${Date.now()}_${safeName}`;

    // 3. Đẩy file vật lý lên Supabase Storage (vào bucket 'contracts')
    const { data: storageData, error: storageError } = await supabase
      .storage
      .from('contracts')
      .upload(uniqueFileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (storageError) throw storageError;

    // 4. Lấy đường link URL công khai của file vừa tải lên
    const { data: publicUrlData } = supabase.storage.from('contracts').getPublicUrl(uniqueFileName);
    const fileUrl = publicUrlData.publicUrl;

    // 5. Lưu tên file TIẾNG VIỆT GỐC và URL vào Database để hiển thị đẹp trên giao diện
    const { data: dbData, error: dbError } = await supabase
      .from('files')
      .insert([
        { task_id: taskId, name: originalName, type: 'PDF', file_url: fileUrl }
      ])
      .select();

    if (dbError) throw dbError;

    res.json({ message: 'Tải file thành công!', data: dbData });

  } catch (error) {
    console.error("Lỗi Upload:", error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi tải file lên.' });
  }
});
// --- API Tạo công việc mới ---
app.post('/api/tasks', async (req, res) => {
  try {
    const { userId, title, label, date } = req.body;

    // Yêu cầu Supabase thêm một dòng mới vào bảng 'tasks'
    const { data, error } = await supabase
      .from('tasks')
      .insert([
        { 
          user_id: userId, 
          title: title, 
          label: label, 
          date_str: date, 
          status: 'pending' // Mặc định việc mới tạo sẽ ở trạng thái chờ xử lý
        }
      ])
      .select();

    if (error) throw error;

    res.json({ message: 'Tạo công việc thành công!', data: data });
  } catch (error) {
    console.error("Lỗi khi tạo công việc:", error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo công việc.' });
  }
});
// --- API 1: Cập nhật trạng thái công việc (Tích/Bỏ tích) ---
app.put('/api/tasks/:id/status', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body; // Trạng thái mới: 'completed' hoặc 'pending'

    const { data, error } = await supabase
      .from('tasks')
      .update({ status: status })
      .eq('id', taskId)
      .select();

    if (error) throw error;
    res.json({ message: 'Đã cập nhật trạng thái!', data });
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// --- API 2: Xóa công việc ---
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    
    // Lưu ý: Các file đính kèm trong bảng 'files' sẽ tự động bị xóa theo nhờ thiết lập CASCADE lúc tạo bảng
    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) throw error;
    res.json({ message: 'Xóa công việc thành công' });
  } catch (error) {
    console.error("Lỗi xóa công việc:", error);
    res.status(500).json({ error: 'Lỗi server' });
  }
});
// Bật máy chủ lắng nghe kết nối
app.listen(PORT, () => {
  console.log(`🚀 Backend Server đang chạy tại địa chỉ: http://localhost:${PORT}`);
});
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Khởi tạo kết nối với Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);