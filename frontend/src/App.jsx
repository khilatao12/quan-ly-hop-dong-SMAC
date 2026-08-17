import React, { useState, useEffect } from "react";

// === Dữ liệu mẫu (Mock Data) ===
const mockUsers = [
  { id: "u1", name: "Trần Nam Phong", role: "Kỹ thuật viên" },
  { id: "u2", name: "Nguyễn Văn A", role: "Chỉ huy trưởng" },
  { id: "u3", name: "Lê Thị B", role: "Hành chính dự án" },
];

// === Bảng màu & token thiết kế ===
const C = {
  bg: "#F3F4F6",
  surface: "#FFFFFF",
  ink: "#101827",
  inkMuted: "#5B6472",
  inkFaint: "#8A93A1",
  border: "#E7E9EE",
  accent: "#125C66",
  accentSoft: "#E3EEEF",
  warn: "#C2410C",
  warnSoft: "#FCEEE3",
  ok: "#15803D",
  okSoft: "#E8F5EC",
  blue: "#0284C7",
  blueSoft: "#E0F2FE",
};

// === Icons ===
const IconHome = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconUsers = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <circle cx="9" cy="8" r="3.2" />
    <path
      d="M2.5 20c.7-3.4 3.3-5.5 6.5-5.5s5.8 2.1 6.5 5.5"
      strokeLinecap="round"
    />
    <circle cx="17.5" cy="9" r="2.4" />
    <path d="M15.8 14.6c2.6.2 4.6 2.1 5.2 5" strokeLinecap="round" />
  </svg>
);
const IconChat = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      d="M21 12a8 8 0 1 1-3.2-6.4L21 4l-1 3.6A7.96 7.96 0 0 1 21 12Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconStar = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      d="m12 3 2.7 5.9 6.3.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.1 1.4-6.3-4.8-4.3 6.3-.6L12 3Z"
      strokeLinejoin="round"
    />
  </svg>
);
const IconGrid = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
const IconClock = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke={C.accent}
    strokeWidth="1.8"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconAlert = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke={C.warn}
    strokeWidth="1.8"
  >
    <path d="M12 3 2 20h20L12 3Z" strokeLinejoin="round" />
    <path d="M12 10v4" strokeLinecap="round" />
    <circle cx="12" cy="17" r="0.6" fill={C.warn} stroke="none" />
  </svg>
);
const IconFolder = () => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#D7DBE1"
    strokeWidth="1.4"
  >
    <path
      d="M3 7a1 1 0 0 1 1-1h4.5l1.5 2H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z"
      strokeLinejoin="round"
    />
  </svg>
);
const IconDoc = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke={C.inkMuted}
    strokeWidth="1.8"
  >
    <path d="M7 3h7l4 4v14H7V3Z" strokeLinejoin="round" />
    <path d="M14 3v4h4" strokeLinejoin="round" />
  </svg>
);
const IconPlus = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
  >
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);
const IconCheck = ({ done }) => (
  <div
    style={{
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      flexShrink: 0,
      border: `1.6px solid ${done ? C.ok : "#CBD1D9"}`,
      backgroundColor: done ? C.ok : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {done && (
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
      >
        <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </div>
);
const IconPDF = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#DC2626"
    strokeWidth="2"
  >
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      strokeLinejoin="round"
    />
    <path d="M14 2v6h6" strokeLinejoin="round" />
    <path d="M9 15h6M9 11h6M9 19h4" strokeLinecap="round" />
  </svg>
);
const IconChevronDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconChevronUp = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconTrash = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
function App() {
  // Navigation State
  const [activeNav, setActiveNav] = useState("home");
  // Tasks State
  const [selectedUser, setSelectedUser] = useState(mockUsers[0].id);
  const [expandedTask, setExpandedTask] = useState(null);
  const [tasksData, setTasksData] = useState([]);
  // --- STATE CHO MODAL TẠO VIỆC ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    label: "Hợp đồng",
    date: "",
  });

  const handleCreateTask = async (e) => {
    e.preventDefault(); // Ngăn trình duyệt tải lại trang khi bấm submit
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newTask,
          userId: selectedUser, // Tự động gắn việc cho người đang được chọn ở Tab
        }),
      });
      if (response.ok) {
        alert("Đã giao việc thành công!");
        setIsModalOpen(false); // Đóng hộp thoại
        setNewTask({ title: "", label: "Hợp đồng", date: "" }); // Reset form
        window.location.reload(); // Tải lại trang để hiện việc mới
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Không thể tạo công việc");
    }
  };
  // --- HÀM TÍCH / BỎ TÍCH HOÀN THÀNH ---
  const handleToggleStatus = async (taskId, currentStatus, e) => {
    e.stopPropagation(); // Ngăn sự kiện click làm mở rộng tab đính kèm file
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    
    // Cập nhật giao diện ngay lập tức cho mượt (không cần chờ phản hồi)
    setTasksData(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) {
      console.error('Lỗi khi đổi trạng thái:', error);
    }
  };

  // --- HÀM XÓA CÔNG VIỆC ---
  const handleDeleteTask = async (taskId, e) => {
    e.stopPropagation(); 
    if (!window.confirm("Bạn có chắc chắn muốn xóa công việc này? Mọi file đính kèm sẽ bị xóa theo.")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Lọc bỏ công việc đã xóa khỏi giao diện
        setTasksData(prev => prev.filter(t => t.id !== taskId));
      }
    } catch (error) {
      console.error('Lỗi xóa việc:', error);
    }
  };
  // --------------------------------
  // Tự động gọi API khi giao diện vừa tải xong
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((response) => response.json()) // Biến dữ liệu thô thành định dạng web hiểu được
      .then((data) => {
        setTasksData(data); // Đổ dữ liệu vào state
      })
      .catch((error) => console.error("Lỗi khi kết nối Backend:", error));
  }, []);
  // ------------------------------

  // Lọc công việc theo người dùng đang được chọn (dùng biến tasksData mới)
  const userTasks = tasksData.filter((task) => task.userId === selectedUser);
  const handleFileUpload = async (taskId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Đóng gói file vào FormData để gửi đi
    const formData = new FormData();
    formData.append("pdfFile", file);
    formData.append("taskId", taskId);

    try {
      alert(`Đang tải file ${file.name} lên hệ thống... Vui lòng đợi.`);

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Tải file thành công!");
        // Tải lại trang để lấy dữ liệu mới nhất từ Database
        window.location.reload();
      } else {
        alert("Lỗi khi tải file lên!");
      }
    } catch (error) {
      console.error("Lỗi upload:", error);
      alert("Không thể kết nối đến máy chủ.");
    }
  };
  const navItems = [
    { id: "home", icon: IconHome, label: "Trang chủ" },
    { id: "tasks", icon: IconUsers, label: "Công việc nhân sự" },
    { id: "chat", icon: IconChat, label: "Trò chuyện" },
    { id: "saved", icon: IconStar, label: "Đánh dấu" },
  ];

  const cardStyle = {
    backgroundColor: C.surface,
    padding: "28px",
    borderRadius: "14px",
    border: `1px solid ${C.border}`,
  };
  const btnPrimary = {
    backgroundColor: C.accent,
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "Inter, sans-serif",
  };
  const btnSecondary = {
    backgroundColor: "#fff",
    color: C.accent,
    border: `1px solid ${C.border}`,
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    fontFamily: "Inter, sans-serif",
  };

  // Khối giao diện Trang chủ (Giữ nguyên như cũ)
  const renderHome = () => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "36px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <div
            style={{
              color: C.inkFaint,
              fontSize: "13px",
              marginBottom: "6px",
              fontFamily: "IBM Plex Mono, monospace",
              letterSpacing: "0.02em",
            }}
          >
            THỨ HAI · 10/08/2026
          </div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 800,
              margin: 0,
              color: C.ink,
              fontFamily: "Manrope, sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            Chào buổi sáng, Trần Nam Phong
          </h1>
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <button className="btn-primary" style={btnPrimary}>
            Liên hệ tư vấn
          </button>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src="https://i.pravatar.cc/42?u=tran"
              alt="Avatar"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                border: `1px solid ${C.border}`,
              }}
            />
            <div style={{ fontSize: "13px" }}>
              <div style={{ color: C.ink, fontWeight: 600 }}>
                Công ty CP Ứng dụng...
              </div>
              <div style={{ fontSize: "12px", color: C.inkFaint }}>
                Chuyển đổi ▾
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="stats-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr 1fr",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            ...cardStyle,
            padding: "20px 22px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <IconClock />
          <div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: C.ink,
                fontFamily: "Manrope, sans-serif",
              }}
            >
              2
            </div>
            <div style={{ color: C.inkMuted, fontSize: "13px" }}>
              Sắp đến hạn
            </div>
          </div>
        </div>
        <div
          style={{
            ...cardStyle,
            padding: "20px 22px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            backgroundColor: C.warnSoft,
            border: `1px solid #F0CBAE`,
          }}
        >
          <IconAlert />
          <div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: C.warn,
                fontFamily: "Manrope, sans-serif",
              }}
            >
              04
            </div>
            <div
              style={{ color: "#9A3B12", fontSize: "13px", fontWeight: 600 }}
            >
              Quá hạn — cần xử lý
            </div>
          </div>
        </div>
        <div
          style={{
            ...cardStyle,
            padding: "20px 22px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <IconUsers />
          <div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: C.ink,
                fontFamily: "Manrope, sans-serif",
              }}
            >
              7
            </div>
            <div style={{ color: C.inkMuted, fontSize: "13px" }}>
              Việc cộng tác
            </div>
          </div>
        </div>
      </div>

      <div
        className="main-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.7fr 1fr",
          gap: "20px",
        }}
      >
        <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
          <h2
            style={{
              fontSize: "17px",
              fontWeight: 700,
              margin: "0 0 24px 0",
              color: C.ink,
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Yêu cầu gửi đi
          </h2>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "18px",
              padding: "40px 0",
            }}
          >
            <IconFolder />
            <div>
              <div
                style={{
                  fontSize: "15.5px",
                  fontWeight: 700,
                  color: C.ink,
                  marginBottom: "6px",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                Chưa có yêu cầu
              </div>
              <div
                style={{
                  color: C.inkMuted,
                  fontSize: "13.5px",
                  maxWidth: "230px",
                  lineHeight: 1.5,
                }}
              >
                Không gian quản lý tất cả các yêu cầu đã gửi.
              </div>
            </div>
            <button
              className="btn-secondary"
              style={{
                ...btnSecondary,
                width: "auto",
                padding: "9px 18px",
                marginTop: "4px",
              }}
            >
              <IconPlus /> Thêm yêu cầu
            </button>
          </div>
        </div>
        <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
          <h2
            style={{
              fontSize: "17px",
              fontWeight: 700,
              margin: "0 0 24px 0",
              color: C.ink,
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Hoạt động gần đây
          </h2>
          <div
            style={{
              color: C.inkFaint,
              fontSize: "14px",
              textAlign: "center",
              padding: "40px 0",
            }}
          >
            Chưa có hoạt động nào
          </div>
        </div>
      </div>
    </>
  );

  // Khối giao diện Tab Quản lý Công việc nhân sự
  const renderTasks = () => (
    <>
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 800,
            margin: "0 0 8px 0",
            color: C.ink,
            fontFamily: "Manrope, sans-serif",
            letterSpacing: "-0.01em",
          }}
        >
          Quản lý Hợp đồng & Hồ sơ
        </h1>
        <div style={{ color: C.inkMuted, fontSize: "14px" }}>
          Lựa chọn nhân sự để kiểm tra tiến độ và tài liệu đính kèm.
        </div>
      </div>

      <div style={cardStyle}>
        {/* Tab chọn nhân sự */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            borderBottom: `1px solid ${C.border}`,
            paddingBottom: "20px",
            marginBottom: "24px",
            overflowX: "auto",
          }}
        >
          {mockUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user.id)}
              style={{
                padding: "10px 18px",
                borderRadius: "30px",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s",
                border: "none",
                backgroundColor: selectedUser === user.id ? C.accent : C.bg,
                color: selectedUser === user.id ? "#fff" : C.inkMuted,
              }}
            >
              {user.name}{" "}
              <span style={{ fontWeight: 400, opacity: 0.8 }}>
                - {user.role}
              </span>
            </button>
          ))}
        </div>

        {/* Nút thêm việc */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px", color: C.ink }}>
            Danh sách công việc ({userTasks.length})
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-secondary"
            style={{ ...btnSecondary, width: "auto", padding: "8px 16px" }}
          >
            <IconPlus /> Giao việc mới
          </button>
        </div>

        {/* Danh sách việc */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {userTasks.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: C.inkFaint,
              }}
            >
              Nhân sự này hiện không có công việc nào.
            </div>
          ) : (
            userTasks.map((task) => (
              <div
                key={task.id}
                style={{
                  border: `1px solid ${C.border}`,
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {/* Dòng tóm tắt công việc */}
                <div 
                  className="task-header"
                  onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', cursor: 'pointer',
                    backgroundColor: expandedTask === task.id ? '#FAFBFC' : '#fff', transition: 'background 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    
                    {/* Bọc IconCheck trong một div để gắn sự kiện Click */}
                    <div onClick={(e) => handleToggleStatus(task.id, task.status, e)} style={{ padding: '4px' }}>
                      <IconCheck done={task.status === 'completed'} />
                    </div>
                    
                    <div>
                      {/* Thêm gạch ngang chữ nếu việc đã xong */}
                      <div style={{ 
                        fontSize: '15px', color: C.ink, fontWeight: 600, marginBottom: '4px',
                        textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                        opacity: task.status === 'completed' ? 0.6 : 1
                      }}>
                        {task.title}
                      </div>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
                        <span style={{ color: C.accent, fontWeight: 500 }}>{task.label}</span>
                        <span style={{ color: C.inkFaint }}>|</span>
                        <span style={{ color: C.warn, fontFamily: 'IBM Plex Mono, monospace' }}>Deadline: {task.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: C.inkMuted }}>
                    {/* Nút Xóa (Thùng rác) */}
                    <div onClick={(e) => handleDeleteTask(task.id, e)} style={{ color: '#DC2626', padding: '6px', display: 'flex', alignItems: 'center', borderRadius: '6px' }} title="Xóa dự án">
                      <IconTrash />
                    </div>
                    {/* Nút xổ xuống */}
                    {expandedTask === task.id ? <IconChevronUp /> : <IconChevronDown />}
                  </div>
                </div>

                {/* Phần mở rộng hiển thị File PDF */}
                {expandedTask === task.id && (
                  <div
                    style={{
                      padding: "16px 20px 16px 54px",
                      borderTop: `1px solid ${C.border}`,
                      backgroundColor: "#FAFBFC",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          color: C.inkMuted,
                          fontWeight: 500,
                        }}
                      >
                        TÀI LIỆU ĐÍNH KÈM:
                      </div>

                      {/* Nút Thêm File (Ẩn thẻ input đi, chỉ hiện nút bấm đẹp) */}
                      <label
                        style={{
                          ...btnSecondary,
                          padding: "4px 12px",
                          fontSize: "12px",
                          width: "auto",
                          cursor: "pointer",
                        }}
                      >
                        <IconPlus /> Thêm File PDF
                        <input
                          type="file"
                          accept=".pdf"
                          style={{ display: "none" }}
                          onChange={(e) => handleFileUpload(task.id, e)}
                        />
                      </label>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "12px",
                      }}
                    >
                      {task.files.map((file) => (
                        /* Thẻ <a> bọc ngoài để bấm vào là mở file trên tab mới */
                        <a
                          key={file.id}
                          href={file.file_url || "#"}
                          target="_blank"
                          rel="noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "12px 16px",
                              backgroundColor: "#fff",
                              border: `1px solid ${C.border}`,
                              borderRadius: "8px",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                overflow: "hidden",
                              }}
                            >
                              <IconPDF />
                              <div
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  fontSize: "13.5px",
                                  color: C.ink,
                                  fontWeight: 500,
                                }}
                              >
                                {file.name}
                              </div>
                            </div>
                            <span
                              style={{
                                fontSize: "11px",
                                backgroundColor: C.bg,
                                padding: "4px 8px",
                                borderRadius: "4px",
                                color: C.inkMuted,
                                fontWeight: 600,
                              }}
                            >
                              {file.type}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );

  return (
    <div
      style={{
        backgroundColor: C.bg,
        minHeight: "100vh",
        width: "100%",
        fontFamily: "Inter, system-ui, sans-serif",
        color: C.ink,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; width: 100%; }
        .nav-item:hover { background-color: ${C.accentSoft} !important; }
        .task-header:hover { background-color: #FAFBFC !important; }
        .btn-secondary:hover { border-color: ${C.accent}; }
        .btn-primary:hover { opacity: 0.92; }
        button:focus-visible, .nav-item:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 2px; }
        ::-webkit-scrollbar { height: 6px; width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD1D9; border-radius: 10px; }
        @media (max-width: 880px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .content-area { padding: 28px 20px !important; margin-left: 68px !important; }
          .stats-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* === Sidebar === */}
      <div
        style={{
          width: "76px",
          backgroundColor: C.surface,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "22px 0",
          borderRight: `1px solid ${C.border}`,
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            backgroundColor: C.accent,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800,
            fontSize: "15px",
          }}
        >
          cx
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "36px",
            width: "100%",
            alignItems: "center",
          }}
        >
          {navItems.map((item) => (
            <div
              key={item.id}
              tabIndex={0}
              onClick={() => setActiveNav(item.id)}
              className="nav-item"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s",
                color: activeNav === item.id ? C.accent : C.inkMuted,
                backgroundColor:
                  activeNav === item.id ? C.accentSoft : "transparent",
              }}
              title={item.label}
            >
              <item.icon />
            </div>
          ))}
        </div>
        <button
          className="nav-item"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "10px",
            border: "none",
            background: "none",
            color: C.inkMuted,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Ứng dụng khác"
        >
          <IconGrid />
        </button>
      </div>

      {/* === Nội dung chính === */}
      <div
        className="content-area"
        style={{ marginLeft: "76px", padding: "40px 56px", maxWidth: "1280px" }}
      >
        {activeNav === "home" ? (
          renderHome()
        ) : activeNav === "tasks" ? (
          renderTasks()
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "100px 0",
              color: C.inkMuted,
            }}
          >
            Giao diện đang được phát triển...
          </div>
        )}
      </div>
      {/* === HỘP THOẠI TẠO CÔNG VIỆC (MODAL) === */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "400px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            <h2
              style={{
                margin: "0 0 20px 0",
                fontSize: "18px",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              Giao việc mới
            </h2>

            <form
              onSubmit={handleCreateTask}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "5px",
                    color: C.inkMuted,
                  }}
                >
                  Tên công việc / Dự án
                </label>
                <input
                  required
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="Ví dụ: Thi công PCCC Tòa nhà A..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: `1px solid ${C.border}`,
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      marginBottom: "5px",
                      color: C.inkMuted,
                    }}
                  >
                    Phân loại
                  </label>
                  <select
                    value={newTask.label}
                    onChange={(e) =>
                      setNewTask({ ...newTask, label: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: `1px solid ${C.border}`,
                      outline: "none",
                    }}
                  >
                    <option value="Hợp đồng">Hợp đồng</option>
                    <option value="BBNT">Biên bản nghiệm thu (BBNT)</option>
                    <option value="Bản vẽ">Bản vẽ thiết kế</option>
                    <option value="Khảo sát">Báo cáo khảo sát</option>
                    <option value="Bảo trì">Bảo trì hệ thống</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      marginBottom: "5px",
                      color: C.inkMuted,
                    }}
                  >
                    Hạn chót (Deadline)
                  </label>
                  <input
                    required
                    type="text"
                    value={newTask.date}
                    onChange={(e) =>
                      setNewTask({ ...newTask, date: e.target.value })
                    }
                    placeholder="VD: 20/08, 15:00"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: `1px solid ${C.border}`,
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: C.bg,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: C.accent,
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Lưu công việc
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
