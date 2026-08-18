import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

// === Dữ liệu nhân sự mẫu ===
// === Dữ liệu nhân sự mẫu (Có tài khoản & Mật khẩu) ===
// const usersList = [
//   {
//     id: "u1",
//     username: "admin",
//     password: "123",
//     name: "Trần Nam Phong",
//     role: "admin",
//     title: "Quản lý dự án",
//   },
//   {
//     id: "u2",
//     username: "vana",
//     password: "123",
//     name: "Nguyễn Văn A",
//     role: "nhân sự",
//     title: "Kỹ thuật viên",
//   },
//   {
//     id: "u3",
//     username: "thib",
//     password: "123",
//     name: "Lê Thị B",
//     role: "nhân sự",
//     title: "Kỹ thuật viên",
//   },
// ];

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
  danger: "#DC2626",
  dangerSoft: "#FEF2F2",
};

// === Icons ===
const IconUser = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconLogout = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const IconLock = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconEye = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const IconEyeOff = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
  </svg>
);
const IconShield = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
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
const IconCheckCircle = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke={C.ok}
    strokeWidth="1.8"
  >
    <path
      d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 4L12 14.01l-3-3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
    <path d="M6 9l6 6 6-6" strokeLinuseEfecap="round" strokeLinejoin="round" />
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
const IconX = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Hãy đổi link này thành link Render Backend của bạn nếu đang đưa lên mạng
const API_URL = "https://quan-ly-hop-dong-smac.onrender.com/api";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("smac_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsersList(data));
  }, []);
  const [authMode, setAuthMode] = useState("login"); // 'login' hoặc 'change_password'
  const [authForm, setAuthForm] = useState({
    username: "",
    password: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: authForm.username,
          password: authForm.password,
        }),
      });
      if (res.ok) {
        const user = await res.json();
        setCurrentUser(user);
        setSelectedUser(user.id);
        localStorage.setItem("smac_user", JSON.stringify(user)); // Lưu vào trình duyệt
      } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: authForm.username,
          oldPassword: authForm.password,
          newPassword: authForm.newPassword,
        }),
      });
      if (res.ok) {
        alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
        setAuthMode("login");
        setAuthForm({ username: "", password: "", newPassword: "" });
      } else {
        alert("Tài khoản hoặc mật khẩu cũ không đúng!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("smac_user"); // Xóa bộ nhớ
    setCurrentUser(null); // Đẩy ra màn hình Login
  };
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [selectedUser, setSelectedUser] = useState(currentUser?.id || null);
  const [expandedTask, setExpandedTask] = useState(null);
  const [tasksData, setTasksData] = useState([]);

  // State Modal Tạo Việc
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    label: "Hợp đồng",
    date: "",
  });

  // 1. Tự động tải dữ liệu khi mở web
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasksData(data);

        // Bước 1: Giữ màn hình Loading 1 giây cho đẹp
        setTimeout(() => {
          setIsFadingOut(true); // Bắt đầu hiệu ứng mờ dần (Fade out)

          // Bước 2: Đợi thêm 0.5 giây cho hiệu ứng mờ chạy xong thì mới xóa hẳn Loading Screen
          setTimeout(() => setIsLoading(false), 500);
        }, 1000);
      })
      .catch((err) => {
        console.error("Lỗi kết nối:", err);
        setIsLoading(false);
      });
  }, []);

  // Tính toán số liệu thực tế cho Dashboard
  // 1. Dữ liệu cho Dashboard (Tổng quan)
  const dashboardTasks =
    currentUser?.role === "admin"
      ? tasksData
      : tasksData.filter((t) => t.userId === currentUser?.id);
  const totalTasks = dashboardTasks.length;
  const completedTasks = dashboardTasks.filter(
    (t) => t.status === "completed",
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  // 2. Dữ liệu cho Tab Công việc
  const displayUserId =
    currentUser?.role === "admin" ? selectedUser : currentUser?.id;
  const userTasks = tasksData.filter((task) => task.userId === displayUserId);

  // --- CÁC HÀM XỬ LÝ API ---
 const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTask, userId: selectedUser }),
      });
      if (response.ok) {
        setIsModalOpen(false);
        setNewTask({ title: '', label: 'Hợp đồng', date: '' });
        
        // Tải lại ngầm dữ liệu để cập nhật giao diện ngay lập tức
        const res = await fetch(`${API_URL}/tasks`);
        const newData = await res.json();
        setTasksData(newData);

        Swal.fire({ icon: 'success', title: 'Đã giao việc!', timer: 1500, showConfirmButton: false });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Lỗi', text: 'Không thể tạo công việc' });
    }
  };

  const handleToggleStatus = async (taskId, currentStatus, e) => {
    e.stopPropagation();
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    setTasksData(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    try {
      await fetch(`${API_URL}/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) { console.error('Lỗi đổi trạng thái:', error); }
  };

  const handleDeleteTask = async (taskId, e) => {
    e.stopPropagation(); 
    
    // Popup xác nhận siêu đẹp
    const result = await Swal.fire({
      title: 'Xóa dự án này?',
      text: "Mọi file PDF đính kèm sẽ bị xóa vĩnh viễn!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa ngay'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/tasks/${taskId}`, { method: 'DELETE' });
        if (res.ok) {
          setTasksData(prev => prev.filter(t => t.id !== taskId)); // Xóa ngay trên giao diện
          Swal.fire({ icon: 'success', title: 'Đã xóa!', timer: 1500, showConfirmButton: false });
        }
      } catch (error) { console.error('Lỗi xóa việc:', error); }
    }
  };

  const handleFileUpload = async (taskId, event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Bật Popup Loading
    Swal.fire({
      title: 'Đang tải lên...',
      text: `Hệ thống đang xử lý ${files.length} tài liệu, vui lòng chờ!`,
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      // Cho phép Backend cũ xử lý mượt bằng cách gửi ngầm từng file một trong vòng lặp
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('pdfFile', files[i]);
        formData.append('taskId', taskId);
        await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
      }

      // Xong thì tải ngầm lại danh sách tasks để lấy link file mới
      const res = await fetch(`${API_URL}/tasks`);
      const newData = await res.json();
      setTasksData(newData);

      Swal.fire({ icon: 'success', title: 'Thành công!', text: `Đã lưu ${files.length} file.`, timer: 1500, showConfirmButton: false });
    } catch (error) { 
      Swal.fire({ icon: 'error', title: 'Lỗi upload', text: 'Đường truyền không ổn định' });
    } finally {
      event.target.value = ''; // Reset input để có thể up tiếp file cùng tên
    }
  };

  const handleDeleteFile = async (fileId, e) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    const result = await Swal.fire({
      title: 'Xóa tài liệu này?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/files/${fileId}`, { method: 'DELETE' });
        if (res.ok) {
          setTasksData(prevTasks => prevTasks.map(task => ({
            ...task,
            files: task.files.filter(f => f.id !== fileId)
          })));
          Swal.fire({ icon: 'success', title: 'Đã xóa file!', timer: 1500, showConfirmButton: false });
        }
      } catch (error) { console.error('Lỗi xóa file:', error); }
    }
  };

  // Các style chung
  const cardStyle = {
    backgroundColor: C.surface,
    padding: "28px",
    borderRadius: "14px",
    border: `1px solid ${C.border}`,
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

  // ==========================================
  // GIAO DIỆN LOADING SCREEN
  // ==========================================
  if (isLoading) {
    return (
      <div
        style={{
          backgroundImage: "linear-gradient(135deg, #012A40 0%, #008782 100%)",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Manrope, sans-serif",

          /* HIỆU ỨNG MỜ DẦN Ở ĐÂY */
          opacity: isFadingOut ? 0 : 1,
          transition: "opacity 0.5s ease-out",
        }}
      >
        <style>{`
          @keyframes pulse { 
            0% { opacity: 0.8; transform: scale(0.95); } 
            50% { opacity: 1; transform: scale(1.02); } 
            100% { opacity: 0.8; transform: scale(0.95); } 
          }
          .loading-logo { animation: pulse 1.8s infinite ease-in-out; }
        `}</style>

        {/* Hình ảnh Logo S.M.A.C */}
        <div className="loading-logo" style={{ textAlign: "center" }}>
          <img
            src="/smac-logo-removebg-preview.png"
            alt="S.M.A.C Loading..."
            style={{
              width: "220px", // Bạn có thể tăng giảm số này để chỉnh độ to/nhỏ của logo
              height: "auto",
            }}
          />
        </div>

        {/* Thanh chạy tiến độ màu vàng đồng */}
        <div
          style={{
            marginTop: "30px",
            width: "200px",
            height: "4px",
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "50%",
              height: "100%",
              backgroundColor: "#DAB866", // Màu vàng đồng trích xuất từ logo
              borderRadius: "4px",
              animation: "slide 1.2s infinite linear",
            }}
          />
        </div>
        <style>{`@keyframes slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }`}</style>
      </div>
    );
  }
  if (!currentUser) {
    return (
      <div
        style={{
          backgroundImage: "linear-gradient(135deg, #033335 0%, #011E26 100%)",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            backgroundColor: "#F8FAFC",
            padding: "45px 50px",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            width: "480px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2
              style={{
                margin: "0 0 8px 0",
                color: "#0F4C5C",
                fontSize: "24px",
                fontWeight: 800,
              }}
            >
              HỆ THỐNG QUẢN LÝ
            </h2>
            <p
              style={{
                margin: 0,
                color: "#5B6472",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Quản lý an toàn – Vận hành hiệu quả
            </p>
            <div
              style={{
                width: "40px",
                height: "3px",
                backgroundColor: "#008782",
                margin: "16px auto 0",
              }}
            />
          </div>

          {/* TAB CHUYỂN ĐỔI */}
          <div
            style={{
              display: "flex",
              marginBottom: "32px",
              backgroundColor: "#F1F5F9",
              borderRadius: "10px",
              padding: "6px",
            }}
          >
            <button
              onClick={() => setAuthMode("login")}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s",
                backgroundColor:
                  authMode === "login" ? "#0F4C5C" : "transparent",
                color: authMode === "login" ? "#fff" : "#475569",
                boxShadow:
                  authMode === "login" ? "0 4px 6px rgba(0,0,0,0.1)" : "none",
              }}
            >
              <IconUser /> Đăng nhập
            </button>
            <button
              onClick={() => setAuthMode("change_password")}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s",
                backgroundColor:
                  authMode === "change_password" ? "#0F4C5C" : "transparent",
                color: authMode === "change_password" ? "#fff" : "#475569",
                boxShadow:
                  authMode === "change_password"
                    ? "0 4px 6px rgba(0,0,0,0.1)"
                    : "none",
              }}
            >
              <IconShield /> Đổi mật khẩu
            </button>
          </div>

          {/* FORM XỬ LÝ */}
          <form
            onSubmit={authMode === "login" ? handleLogin : handleChangePassword}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Input Tài khoản */}
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  color: "#0F4C5C",
                  textTransform: "uppercase",
                }}
              >
                <IconUser /> TÀI KHOẢN
              </label>
              <div
                style={{
                  display: "flex",
                  height: "52px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#F8FAFC",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    backgroundColor: "#0F4C5C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                >
                  <IconUser />
                </div>
                <input
                  required
                  type="text"
                  value={authForm.username}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, username: e.target.value })
                  }
                  style={{
                    flex: 1,
                    padding: "0 16px",
                    border: "none",
                    outline: "none",
                    fontSize: "15px",
                    backgroundColor: "transparent",
                    color: "black",
                  }}
                  placeholder="Username"
                />
              </div>
            </div>

            {/* Input Mật khẩu */}
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  color: "#0F4C5C",
                  textTransform: "uppercase",
                }}
              >
                <IconLock /> {authMode === "login" ? "MẬT KHẨU" : "MẬT KHẨU CŨ"}
              </label>
              <div
                style={{
                  display: "flex",
                  height: "52px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#F8FAFC",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    backgroundColor: "#0F4C5C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                >
                  <IconLock />
                </div>

                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={authForm.password}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, password: e.target.value })
                  }
                  style={{
                    flex: 1,
                    padding: "0 16px",
                    border: "none",
                    outline: "none",
                    fontSize: "15px",
                    backgroundColor: "transparent",
                    letterSpacing: showPassword ? "normal" : "2px",
                    color: "black",
                  }}
                  placeholder="Password"
                />

                {/* Nút bấm ẩn/hiện */}
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    width: "52px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94A3B8",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <IconEyeOff /> : <IconEye />}
                </div>
              </div>
            </div>

            {/* Input Mật khẩu mới (chỉ hiện khi ở tab Đổi mật khẩu) */}
            {authMode === "change_password" && (
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "13px",
                    fontWeight: 700,
                    marginBottom: "8px",
                    color: "#0F4C5C",
                    textTransform: "uppercase",
                  }}
                >
                  <IconLock /> MẬT KHẨU MỚI
                </label>
                <div
                  style={{
                    display: "flex",
                    height: "52px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid #E2E8F0",
                    backgroundColor: "#F8FAFC",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      backgroundColor: "#0F4C5C",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                    }}
                  >
                    <IconLock />
                  </div>

                  <input
                    required
                    type={showNewPassword ? "text" : "password"}
                    value={authForm.newPassword}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, newPassword: e.target.value })
                    }
                    style={{
                      flex: 1,
                      padding: "0 16px",
                      border: "none",
                      outline: "none",
                      fontSize: "15px",
                      backgroundColor: "transparent",
                      letterSpacing: showNewPassword ? "normal" : "2px",
                      color: "black",
                    }}
                    placeholder="New password"
                  />

                  {/* Nút bấm ẩn/hiện */}
                  <div
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{
                      width: "52px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#94A3B8",
                      cursor: "pointer",
                    }}
                  >
                    {showNewPassword ? <IconEyeOff /> : <IconEye />}
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              style={{
                marginTop: "12px",
                width: "100%",
                padding: "16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#0F4C5C",
                color: "#fff",
                fontWeight: 700,
                fontSize: "15px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <IconShield />{" "}
              {authMode === "login" ? "Truy cập hệ thống" : "Cập nhật mật khẩu"}
            </button>
          </form>
        </div>
      </div>
    );
  }
  // ==========================================
  // GIAO DIỆN TRANG CHỦ (DASHBOARD)
  // ==========================================
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
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 800,
              margin: 0,
              color: C.ink,
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Tổng quan Hệ thống
          </h1>
          <div
            style={{ color: C.inkMuted, fontSize: "14px", marginTop: "6px" }}
          >
            Theo dõi tiến độ Công việc.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            padding: "8px 16px",
            backgroundColor: "#fff",
            borderRadius: "30px",
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: C.accentSoft,
              color: C.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconUser />
          </div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: C.ink }}>
            {currentUser?.name}
          </div>
        </div>
      </div>

      <div
        className="stats-row"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {/* Khối Đang xử lý */}
        <div
          style={{
            ...cardStyle,
            padding: "24px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            backgroundColor: C.blueSoft,
            border: "none",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconClock />
          </div>
          <div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: 800,
                color: C.blue,
                fontFamily: "Manrope, sans-serif",
                lineHeight: 1,
              }}
            >
              {pendingTasks}
            </div>
            <div
              style={{
                color: "#0369A1",
                fontSize: "14px",
                fontWeight: 600,
                marginTop: "4px",
              }}
            >
              Dự án Đang xử lý
            </div>
          </div>
        </div>
        {/* Khối Hoàn thành */}
        <div
          style={{
            ...cardStyle,
            padding: "24px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            backgroundColor: C.okSoft,
            border: "none",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconCheckCircle />
          </div>
          <div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: 800,
                color: C.ok,
                fontFamily: "Manrope, sans-serif",
                lineHeight: 1,
              }}
            >
              {completedTasks}
            </div>
            <div
              style={{
                color: "#166534",
                fontSize: "14px",
                fontWeight: 600,
                marginTop: "4px",
              }}
            >
              Đã hoàn thành
            </div>
          </div>
        </div>
        {/* Khối Tổng số */}
        <div
          style={{
            ...cardStyle,
            padding: "24px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: C.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconFolder />
          </div>
          <div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: 800,
                color: C.ink,
                fontFamily: "Manrope, sans-serif",
                lineHeight: 1,
              }}
            >
              {totalTasks}
            </div>
            <div
              style={{
                color: C.inkMuted,
                fontSize: "14px",
                fontWeight: 600,
                marginTop: "4px",
              }}
            >
              Tổng số Hồ sơ
            </div>
          </div>
        </div>
      </div>

      <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
        <h2
          style={{
            fontSize: "17px",
            fontWeight: 700,
            margin: "0 0 20px 0",
            color: C.ink,
            fontFamily: "Manrope, sans-serif",
          }}
        >
          Cập nhật Mới nhất
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {dashboardTasks
            .slice(-4)
            .reverse()
            .map((task) => (
              <div
                key={task.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "16px",
                  border: `1px solid ${C.border}`,
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <span
                    style={{
                      padding: "4px 10px",
                      backgroundColor: C.bg,
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: C.inkMuted,
                    }}
                  >
                    {task.label}
                  </span>
                  <span
                    style={{ fontSize: "14px", fontWeight: 600, color: C.ink }}
                  >
                    {task.title}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    color: task.status === "completed" ? C.ok : C.warn,
                    fontWeight: 600,
                  }}
                >
                  {task.status === "completed" ? "Hoàn thành" : "Đang xử lý"}
                </span>
              </div>
            ))}
        </div>
      </div>
    </>
  );

  // ==========================================
  // GIAO DIỆN QUẢN LÝ NHÂN SỰ VÀ FILE
  // ==========================================
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
          }}
        >
          Quản lý Hợp đồng & Hồ sơ
        </h1>
        <div style={{ color: C.inkMuted, fontSize: "14px" }}>
          Công việc và tài liệu đính kèm.
        </div>
      </div>

      <div style={cardStyle}>
        {/* Chọn nhân sự */}
        {/* Chỉ ADMIN mới thấy thanh chọn nhân sự này */}
        {currentUser.role === "admin" && (
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
            {usersList.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user.id)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "30px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  border: "none",
                  transition: "all 0.2s",
                  backgroundColor: selectedUser === user.id ? C.accent : C.bg,
                  color: selectedUser === user.id ? "#fff" : C.inkMuted,
                }}
              >
                {user.name}{" "}
                <span style={{ fontWeight: 400, opacity: 0.8 }}>
                  - {user.title}
                </span>
              </button>
            ))}
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px", color: C.ink }}>
            Danh sách dự án phụ trách ({userTasks.length})
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-secondary"
            style={{ ...btnSecondary, width: "auto", padding: "8px 16px" }}
          >
            <IconPlus /> Giao việc mới
          </button>
        </div>

        {/* Danh sách */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {userTasks.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: C.inkFaint,
              }}
            >
              Chưa có dự án nào được giao.
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
                {/* Header Công việc */}
                <div
                  onClick={() =>
                    setExpandedTask(expandedTask === task.id ? null : task.id)
                  }
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 20px",
                    cursor: "pointer",
                    backgroundColor:
                      expandedTask === task.id ? "#FAFBFC" : "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <div
                      onClick={(e) =>
                        handleToggleStatus(task.id, task.status, e)
                      }
                      style={{ padding: "4px" }}
                    >
                      <IconCheck done={task.status === "completed"} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "15px",
                          color: C.ink,
                          fontWeight: 600,
                          marginBottom: "4px",
                          textDecoration:
                            task.status === "completed"
                              ? "line-through"
                              : "none",
                          opacity: task.status === "completed" ? 0.6 : 1,
                        }}
                      >
                        {task.title}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          fontSize: "13px",
                        }}
                      >
                        <span style={{ color: C.accent, fontWeight: 500 }}>
                          {task.label}
                        </span>
                        <span style={{ color: C.inkFaint }}>|</span>
                        <span
                          style={{
                            color: C.warn,
                            fontFamily: "IBM Plex Mono, monospace",
                          }}
                        >
                          Deadline: {task.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      color: C.inkMuted,
                    }}
                  >
                    <div
                      onClick={(e) => handleDeleteTask(task.id, e)}
                      style={{
                        color: C.danger,
                        padding: "6px",
                        borderRadius: "6px",
                      }}
                      title="Xóa dự án"
                    >
                      <IconTrash />
                    </div>
                    {expandedTask === task.id ? (
                      <IconChevronUp />
                    ) : (
                      <IconChevronDown />
                    )}
                  </div>
                </div>

                {/* Quản lý Files Đính kèm */}
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
                          multiple
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
                          "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "12px",
                      }}
                    >
                      {task.files.map((file) => (
                        <a
                          key={file.id}
                          href={file.file_url || "#"}
                          target="_blank"
                          rel="noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          <div
                            className="file-card"
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
                                  fontSize: "13px",
                                  color: C.ink,
                                  fontWeight: 500,
                                }}
                              >
                                {file.name}
                              </div>
                            </div>

                            {/* Nút xóa File */}
                            <button
                              onClick={(e) => handleDeleteFile(file.id, e)}
                              style={{
                                border: "none",
                                background: C.dangerSoft,
                                color: C.danger,
                                padding: "4px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                display: "flex",
                              }}
                              title="Xóa file này"
                            >
                              <IconX />
                            </button>
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

        /* HIỆU ỨNG HIỆN DẦN VÀ TRƯỢT LÊN CHO TRANG CHỦ */
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
        
        /* Keyframe cho hiệu ứng chuyển cảnh */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        * { box-sizing: border-box; } html, body { margin: 0; padding: 0; width: 100%; }
        .nav-item:hover { background-color: ${C.accentSoft} !important; }
        .btn-secondary:hover { border-color: ${C.accent}; }
        .file-card:hover { border-color: #CBD1D9 !important; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
      `}</style>

      {/* Sidebar */}
      <div
        style={{
          width: "76px",
          backgroundColor: C.surface,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
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
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/smac-logo.jpg"
            alt="Logo"
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
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
          {[
            { id: "home", icon: IconHome, label: "Tổng quan" },
            { id: "tasks", icon: IconUsers, label: "Công việc" },
          ].map((item) => (
            <div
              key={item.id}
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
          <div
            onClick={handleLogout}
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
              color: "#DC2626",
            }}
            title="Đăng xuất"
          >
            <IconLogout />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
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
            Đang phát triển...
          </div>
        )}
      </div>

      {/* Modal Thêm Việc */}
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
              Giao dự án mới
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
                  Tên Dự án / Công việc
                </label>
                <input
                  required
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="Nhập tên..."
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
                    <option value="BBNT">Biên bản nghiệm thu</option>
                    <option value="Bản vẽ">Bản vẽ thiết kế</option>
                    <option value="Khảo sát">Khảo sát / Bảo trì</option>
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
                    Deadline
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
                  Tạo mới
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
