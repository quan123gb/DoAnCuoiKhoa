/* =========================================================
   THÔNG BÁO & THẢO LUẬN - JAVASCRIPT
   Xử lý chọn cuộc trò chuyện, gửi tin nhắn, tạo luồng mới
   và tự động đẩy cuộc trò chuyện cập nhật lên ĐẦU danh sách
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    // ---------------------------------------------------------
    // 1. DỮ LIỆU CÁC LUỒNG THẢO LUẬN & TIN NHẮN INITIAL
    // ---------------------------------------------------------
    let threadsData = [
        {
            id: "TH-0842",
            project: "PRJ-ECOMM-01",
            priority: "urgent",
            tag: "#prj-ecomm-uiux",
            tagClass: "primary",
            priorityLabel: "Khẩn cấp",
            priorityClass: "danger",
            priorityIcon: "bolt",
            time: "15 phút trước",
            title: "[PRJ-ECOMM-01] Thống nhất luồng Check-out OTP & Thiết kế Responsive Mobile v2",
            author: "Nguyễn Văn An",
            role: "Project Manager",
            authorAvatar: "NA",
            avatarClass: "secondary-avatar",
            taskCode: "TSK-204",
            unread: true,
            unreadCount: 6,
            fileCount: 2,
            snippet: "Nhờ Bình cập nhật lại màn hình OTP 6 số theo chuẩn ngân hàng VNPAY trước 17:00 hôm nay nhé...",
            searchKey: "prj-ecomm-uiux thống nhất luồng check-out otp thiết kế responsive mobile v2 nguyễn văn an tsk-204",
            participants: [
                { name: "Nguyễn Văn An (PM)", avatar: "NA", avatarClass: "secondary-avatar" },
                { name: "Trần Thị Bình (Lead UI/UX)", avatar: "TB", avatarClass: "primary-avatar" },
                { name: "Đỗ Quốc Hùng (Tech Lead)", avatar: "QH", avatarClass: "primary-fixed-avatar" },
                { name: "Hoàng Tuấn (QA)", avatar: "HT", avatarClass: "tertiary-fixed-avatar" }
            ],
            messages: [
                {
                    id: 1,
                    author: "Nguyễn Văn An",
                    role: "Project Manager",
                    roleClass: "",
                    avatar: "NA",
                    avatarClass: "secondary-avatar",
                    time: "10:15 Hôm nay",
                    isCurrentUser: false,
                    content: `<p>Chào team <strong class="mention">@all</strong>, sau cuộc họp sáng nay với đối tác Cổng thanh toán, chúng ta cần điều chỉnh popup xác thực OTP từ 4 số sang 6 số và bổ sung đếm ngược 60s có nút gửi lại mã.</p>
                              <p><strong class="mention">@Trần Thị Bình</strong> em lưu ý cập nhật component này trong UI Kit v2 nhé. Task này cần ưu tiên gửi review trước 17:00 hôm nay để kịp Sprint release.</p>
                              <div class="attachment">
                                  <div class="attachment-icon pdf">
                                      <span class="material-symbols-outlined">picture_as_pdf</span>
                                  </div>
                                  <div class="attachment-info">
                                      <strong>PRD_Addendum_Payment_Security_v1.3.pdf</strong>
                                      <span>1.4 MB • Tài liệu đặc tả luồng bảo mật</span>
                                  </div>
                                  <a class="download-btn" href="files/PRD_Addendum_Payment_Security_v1.3.pdf" download title="Tải xuống">
                                      <span class="material-symbols-outlined">download</span>
                                  </a>
                              </div>`
                },
                {
                    id: 2,
                    author: "Đỗ Quốc Hùng",
                    role: "Tech Lead",
                    roleClass: "",
                    avatar: "QH",
                    avatarClass: "primary-fixed-avatar",
                    time: "10:28",
                    isCurrentUser: false,
                    content: `<p>Về phía Frontend và Backend đã chuẩn bị sẵn API endpoints cho luồng OTP 6 số:</p>
                              <div class="code-box">POST /api/v2/auth/verify-otp\n{ transactionId, otpCode: "******" }</div>
                              <p>Khi Bình bàn giao spec Figma thì dev sẽ ráp ngay trong chiều nay. Nhờ Bình bổ sung trường hợp input lỗi và lockout 5 phút nếu nhập sai quá 3 lần.</p>`
                },
                {
                    id: 3,
                    author: "Trần Thị Bình (Bạn)",
                    role: "Lead UI/UX Designer",
                    roleClass: "primary-role",
                    avatar: "TB",
                    avatarClass: "primary-avatar",
                    time: "10:45 (15 phút trước)",
                    isCurrentUser: true,
                    content: `<p>Em đã cập nhật component OTP 6 digits với đầy đủ 4 states (Default, Focus, Error và Resend Counter 60s) trên file Figma <code>PRJ-ECOMM-01_UI_Kit_Checkout_v2.4</code>.</p>
                              <p>Kèm theo cả layout Responsive Mobile cho màn hình iPhone SE (375px) và Android phổ thông. Các anh xem qua link bên dưới giúp em nhé!</p>
                              <div class="figma-preview">
                                  <div class="figma-preview-left">
                                      <div class="figma-thumb"><span class="material-symbols-outlined">design_services</span></div>
                                      <div class="figma-info">
                                          <strong>Figma: Frame 1042 - Checkout OTP Input Matrix</strong>
                                          <span>Cập nhật lúc 10:42 • 4 màn hình • Ready for Dev</span>
                                      </div>
                                  </div>
                                  <a class="btn btn-primary figma-btn" href="https://www.figma.com" target="_blank" rel="noopener noreferrer">
                                      <span class="material-symbols-outlined">visibility</span>
                                      <span>Mở trên Figma</span>
                                  </a>
                              </div>`
                },
                {
                    id: 4,
                    author: "Nguyễn Văn An",
                    role: "Project Manager",
                    roleClass: "",
                    avatar: "NA",
                    avatarClass: "secondary-avatar",
                    time: "11:02",
                    isCurrentUser: false,
                    content: `<p>Giao diện chuẩn và rất rõ ràng! <strong class="mention">@Đỗ Quốc Hùng</strong> cho tiến hành tích hợp theo spec này nhé. Cảm ơn Bình đã xử lý nhanh vượt tiến độ.</p>
                              <div class="reaction-bar">
                                  <button type="button">👍 <span>4</span></button>
                                  <button type="button">❤️ <span>2</span></button>
                                  <button type="button">🚀 <span>3</span></button>
                                  <button type="button" title="Thêm biểu cảm"><span class="material-symbols-outlined">add_reaction</span></button>
                              </div>`
                }
            ]
        },
        {
            id: "TH-0843",
            project: "ALL",
            priority: "high",
            tag: "#thong-bao-chung",
            tagClass: "neutral",
            priorityLabel: "Quan trọng",
            priorityClass: "tertiary",
            priorityIcon: "campaign",
            time: "1 giờ trước",
            title: "[THÔNG BÁO LEADER] Cập nhật mốc Sprint Review 4 và nghiệm thu bàn giao Figma Specs",
            author: "Đỗ Quốc Hùng",
            role: "Tech Lead",
            authorAvatar: "QH",
            avatarClass: "primary-fixed-avatar",
            taskCode: "",
            unread: true,
            unreadCount: 14,
            fileCount: 1,
            snippet: "Toàn bộ thành viên lưu ý hạn chót đồng bộ token và giao diện lên Figma Workspace để tổ chức kiểm thử...",
            searchKey: "thong bao leader cập nhật mốc sprint review 4 nghiệm thu bàn giao figma specs đỗ quốc hùng",
            participants: [
                { name: "Đỗ Quốc Hùng (Tech Lead)", avatar: "QH", avatarClass: "primary-fixed-avatar" },
                { name: "Nguyễn Văn An (PM)", avatar: "NA", avatarClass: "secondary-avatar" },
                { name: "Trần Thị Bình", avatar: "TB", avatarClass: "primary-avatar" }
            ],
            messages: [
                {
                    id: 1,
                    author: "Đỗ Quốc Hùng",
                    role: "Tech Lead",
                    roleClass: "",
                    avatar: "QH",
                    avatarClass: "primary-fixed-avatar",
                    time: "1 giờ trước",
                    isCurrentUser: false,
                    content: `<p>Gửi toàn bộ thành viên dự án: Buổi Sprint Review 4 sẽ diễn ra vào lúc 14:00 chiều Thứ Sáu tuần này.</p>
                              <p>Đề nghị các bạn hoàn thiện toàn bộ giao diện, kiểm thử responsive và đẩy code lên môi trường Staging trước 18:00 ngày Thứ Năm.</p>`
                }
            ]
        },
        {
            id: "TH-0844",
            project: "PRJ-HRM-02",
            priority: "normal",
            tag: "#prj-hrm-dev",
            tagClass: "neutral",
            priorityLabel: "Thông thường",
            priorityClass: "neutral",
            priorityIcon: "chat",
            time: "3 giờ trước",
            title: "[PRJ-HRM-02] Thảo luận luồng tính lương & Wireframe bảng đãi ngộ tháng",
            author: "Trần Thị Mai",
            role: "PM HRM",
            authorAvatar: "TM",
            avatarClass: "high-avatar",
            taskCode: "TSK-HR08",
            unread: false,
            unreadCount: 9,
            fileCount: 0,
            snippet: "Xem qua sơ đồ luồng dữ liệu mới bổ sung tính năng trừ bảo hiểm tự động trên dashboard nhé...",
            searchKey: "prj-hrm-dev thảo luận luồng tính lương wireframe bảng đãi ngộ tháng trần thị mai",
            participants: [
                { name: "Trần Thị Mai (PM HRM)", avatar: "TM", avatarClass: "high-avatar" },
                { name: "Trần Thị Bình", avatar: "TB", avatarClass: "primary-avatar" }
            ],
            messages: [
                {
                    id: 1,
                    author: "Trần Thị Mai",
                    role: "PM HRM",
                    roleClass: "",
                    avatar: "TM",
                    avatarClass: "high-avatar",
                    time: "3 giờ trước",
                    isCurrentUser: false,
                    content: `<p><strong class="mention">@Trần Thị Bình</strong> ơi, nhờ em xem qua wireframe cho module Bảng đãi ngộ nhân sự nhé. Đã bổ sung các trường thông tin thuế TNCN và bảo hiểm bắt buộc rồi đấy.</p>`
                }
            ]
        },
        {
            id: "TH-0845",
            project: "PRJ-ECOMM-01",
            priority: "urgent",
            tag: "CẢNH BÁO SLA",
            tagClass: "danger",
            priorityLabel: "Khẩn cấp",
            priorityClass: "danger",
            priorityIcon: "warning",
            time: "4 giờ trước",
            title: "[CẢNH BÁO SLA] Nhiệm vụ TSK-204 cần gửi review trước 17:00 hôm nay",
            author: "Hệ thống tự động",
            role: "System Bot",
            authorAvatar: "BOT",
            avatarClass: "secondary-avatar",
            taskCode: "TSK-204",
            unread: true,
            unreadCount: 1,
            fileCount: 0,
            snippet: "Thời gian còn lại cho giai đoạn Design: 4 giờ 15 phút. Tiến độ ghi nhận: 85%. Vui lòng đính kèm link Figma...",
            searchKey: "cảnh báo sla nhiệm vụ tsk-204 gửi review trước 17 hôm nay hệ thống bot",
            participants: [
                { name: "System Bot", avatar: "BOT", avatarClass: "secondary-avatar" },
                { name: "Trần Thị Bình", avatar: "TB", avatarClass: "primary-avatar" }
            ],
            messages: [
                {
                    id: 1,
                    author: "Hệ thống tự động",
                    role: "System Bot",
                    roleClass: "",
                    avatar: "BOT",
                    avatarClass: "secondary-avatar",
                    time: "4 giờ trước",
                    isCurrentUser: false,
                    content: `<p><strong class="mention">@Trần Thị Bình</strong> Cảnh báo tự động: Nhiệm vụ <strong>TSK-204</strong> đang tiệm cận mốc SLA Review. Vui lòng hoàn thành đính kèm tài liệu bàn giao trước 17:00.</p>`
                }
            ]
        },
        {
            id: "TH-0846",
            project: "ALL",
            priority: "normal",
            tag: "#noi-bo-hr",
            tagClass: "tertiary-fixed",
            priorityLabel: "Thông thường",
            priorityClass: "neutral",
            priorityIcon: "info",
            time: "Hôm qua",
            title: "[CÔNG TY] Chính sách làm việc kết hợp (Hybrid Work Model Q3/2025)",
            author: "Phòng Nhân sự",
            role: "HR Dept",
            authorAvatar: "HR",
            avatarClass: "tertiary-fixed-avatar",
            taskCode: "",
            unread: false,
            unreadCount: 0,
            fileCount: 24,
            snippet: "Quy định đăng ký ngày làm việc từ xa và chấm công định vị trên hệ thống mới áp dụng bắt đầu từ thứ 2 tuần tới...",
            searchKey: "công ty chính sách làm việc kết hợp hybrid work model q3 2025 phòng nhân sự",
            participants: [
                { name: "Phòng Nhân sự", avatar: "HR", avatarClass: "tertiary-fixed-avatar" }
            ],
            messages: [
                {
                    id: 1,
                    author: "Phòng Nhân sự",
                    role: "HR Dept",
                    roleClass: "",
                    avatar: "HR",
                    avatarClass: "tertiary-fixed-avatar",
                    time: "Hôm qua",
                    isCurrentUser: false,
                    content: `<p>Thông báo tới toàn thể cán bộ nhân viên công ty về chính sách Hybrid Work áp dụng cho Quý 3/2025. Vui lòng đọc kỹ tài liệu đính kèm trên HR Portal.</p>`
                }
            ]
        }
    ];

    // ID luồng đang được chọn
    let activeThreadId = "TH-0842";

    // ---------------------------------------------------------
    // 2. CÁC ELEMENT TRÊN DOM
    // ---------------------------------------------------------
    const threadListContainer = document.getElementById("threadList");
    const discussionCardContainer = document.getElementById("discussionCard");

    const projectFilter = document.getElementById("projectFilter");
    const priorityFilter = document.getElementById("priorityFilter");
    const threadSearch = document.getElementById("threadSearch");
    const refreshBtn = document.getElementById("refreshBtn");
    const newThreadBtn = document.getElementById("newThreadBtn");
    const markAllReadBtn = document.getElementById("markAllReadBtn");

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    const modalOverlay = document.getElementById("modalOverlay");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const modalClose = document.getElementById("modalClose");
    const modalCancel = document.getElementById("modalCancel");
    const modalConfirm = document.getElementById("modalConfirm");

    // ---------------------------------------------------------
    // 3. HÀM RENDER DANH SÁCH BÊN TRÁI (THREAD LIST)
    // ---------------------------------------------------------
    function renderThreadList() {
        if (!threadListContainer) return;

        const currentProj = projectFilter ? projectFilter.value : "all";
        const currentPrio = priorityFilter ? priorityFilter.value : "all";
        const query = threadSearch ? threadSearch.value.trim().toLowerCase() : "";

        // Lọc các luồng theo bộ lọc
        const filteredThreads = threadsData.filter(thread => {
            const matchProject = (currentProj === "all") || (thread.project === currentProj) || (thread.project === "ALL");
            const matchPriority = (currentPrio === "all") || (thread.priority === currentPrio);
            const matchSearch = query === "" || thread.searchKey.toLowerCase().includes(query) || thread.title.toLowerCase().includes(query);

            return matchProject && matchPriority && matchSearch;
        });

        if (filteredThreads.length === 0) {
            threadListContainer.innerHTML = `
                <div style="text-align: center; padding: 32px 16px; color: var(--secondary);">
                    <span class="material-symbols-outlined" style="font-size: 36px; margin-bottom: 8px;">forum</span>
                    <p style="margin: 0; font-weight: 500;">Không tìm thấy luồng thảo luận nào</p>
                </div>
            `;
            return;
        }

        let html = "";
        filteredThreads.forEach(thread => {
            const isActive = thread.id === activeThreadId;
            const activeClass = isActive ? "active-thread" : "";
            const isDangerTitle = thread.priority === "urgent" ? "danger-title" : "";

            html += `
                <article
                    class="thread-card ${activeClass}"
                    data-id="${thread.id}"
                >
                    ${isActive ? '<div class="thread-active-line"></div>' : ''}

                    <div class="thread-top">
                        <div class="thread-tags">
                            <span class="tag ${thread.tagClass}">
                                ${thread.tag}
                            </span>
                            <span class="tag ${thread.priorityClass}">
                                <span class="material-symbols-outlined">${thread.priorityIcon}</span>
                                ${thread.priorityLabel}
                            </span>
                        </div>
                        <time>${thread.time}</time>
                    </div>

                    <h3 class="${isDangerTitle}">
                        ${thread.title}
                    </h3>

                    <div class="thread-author">
                        <div class="mini-avatar ${thread.avatarClass}">
                            ${thread.authorAvatar}
                        </div>
                        <strong>${thread.author}</strong>
                        <span>• ${thread.role}</span>
                    </div>

                    <p>${thread.snippet}</p>

                    <div class="thread-footer">
                        <div>
                            <span class="thread-stat primary-stat">
                                <span class="material-symbols-outlined">chat</span>
                                ${thread.messages.length} phản hồi
                            </span>
                            ${thread.fileCount > 0 ? `
                                <span class="thread-stat">
                                    <span class="material-symbols-outlined">attach_file</span>
                                    ${thread.fileCount} tệp
                                </span>
                            ` : ''}
                        </div>
                        ${thread.unread ? '<span class="unread-dot"></span>' : '<span class="read-label">Đã đọc</span>'}
                    </div>
                </article>
            `;
        });

        threadListContainer.innerHTML = html;

        // Gắn sự kiện Click cho từng item trong danh sách
        const cardElements = threadListContainer.querySelectorAll(".thread-card");
        cardElements.forEach(card => {
            card.addEventListener("click", function () {
                const threadId = this.getAttribute("data-id");
                selectThread(threadId);
            });
        });
    }

    // ---------------------------------------------------------
    // 4. HÀM CHỌN MỘT LUỒNG THẢO LUẬN
    // ---------------------------------------------------------
    function selectThread(threadId) {
        activeThreadId = threadId;

        // Đánh dấu luồng này đã đọc
        const targetThread = threadsData.find(t => t.id === threadId);
        if (targetThread) {
            targetThread.unread = false;
        }

        renderThreadList();
        renderDiscussion();
    }

    // ---------------------------------------------------------
    // 5. HÀM RENDER KHUNG CHAT/THẢO LUẬN BÊN PHẢI (DISCUSSION)
    // ---------------------------------------------------------
    function renderDiscussion() {
        if (!discussionCardContainer) return;

        const thread = threadsData.find(t => t.id === activeThreadId);

        if (!thread) {
            discussionCardContainer.innerHTML = `
                <div style="text-align: center; padding: 48px 16px; color: var(--secondary);">
                    <p>Vui lòng chọn một luồng trao đổi để xem thông tin chi tiết.</p>
                </div>
            `;
            return;
        }

        // Render danh sách thành viên tham gia
        let participantsHtml = "";
        if (thread.participants && thread.participants.length > 0) {
            participantsHtml = thread.participants.map(p => `
                <div class="mini-avatar ${p.avatarClass}" title="${p.name}">
                    ${p.avatar}
                </div>
            `).join("");
        } else {
            participantsHtml = `
                <div class="mini-avatar primary-avatar" title="Trần Thị Bình (Bạn)">TB</div>
            `;
        }

        // Render các tin nhắn trong luồng
        let messagesHtml = "";
        thread.messages.forEach(msg => {
            const isCurrent = msg.isCurrentUser;
            const bubbleClass = isCurrent ? "current-user-bubble" : "";
            const authorClass = isCurrent ? "current-user" : "";

            messagesHtml += `
                <article class="message">
                    <div class="message-avatar ${msg.avatarClass}">
                        ${msg.avatar}
                    </div>
                    <div class="message-content">
                        <div class="message-info">
                            <strong class="${authorClass}">${msg.author}</strong>
                            <span class="role-tag ${msg.roleClass}">${msg.role}</span>
                            <time>${msg.time}</time>
                        </div>
                        <div class="message-bubble ${bubbleClass}">
                            ${msg.content}
                        </div>
                    </div>
                </article>
            `;
        });

        // HTML đầy đủ của khung thảo luận
        discussionCardContainer.innerHTML = `
            <!-- Discussion Header -->
            <div class="discussion-header">
                <div class="discussion-meta-row">
                    <div class="discussion-meta">
                        <strong>${thread.tag}</strong>
                        <span>/</span>
                        <span>Mã luồng: <strong>${thread.id}</strong></span>
                        ${thread.taskCode ? `<span>/</span><span>Nhiệm vụ: <strong>${thread.taskCode}</strong></span>` : ''}
                    </div>

                    <div class="discussion-actions">
                        <button class="icon-btn small" type="button" title="Ghim luồng này">
                            <span class="material-symbols-outlined">push_pin</span>
                        </button>

                        ${thread.taskCode ? `
                            <a class="btn btn-light small-btn" href="chi-tiet-nhiem-vu.html?id=${thread.taskCode}">
                                <span class="material-symbols-outlined">open_in_new</span>
                                <span>Mở Task ${thread.taskCode}</span>
                            </a>
                        ` : ''}

                        <button class="icon-btn small" type="button" title="Thêm tùy chọn">
                            <span class="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                </div>

                <h2>${thread.title}</h2>

                <div class="participants-row">
                    <div class="participants">
                        <span>Thành viên tham gia:</span>
                        <div class="avatar-stack">
                            ${participantsHtml}
                        </div>
                    </div>

                    <div class="online-members">
                        <i></i>
                        Tất cả thành viên đang trực tuyến
                    </div>
                </div>
            </div>

            <!-- Messages List -->
            <div class="messages" id="messagesContainer">
                ${messagesHtml}
            </div>

            <!-- Reply Box -->
            <div class="reply-area">
                <div class="reply-box">
                    <div class="editor-toolbar">
                        <div class="editor-tools">
                            <button type="button" title="Đậm (Ctrl+B)"><span class="material-symbols-outlined">format_bold</span></button>
                            <button type="button" title="Nghiêng (Ctrl+I)"><span class="material-symbols-outlined">format_italic</span></button>
                            <button type="button" title="Chèn code"><span class="material-symbols-outlined">code</span></button>
                            <button type="button" title="Gắn liên kết"><span class="material-symbols-outlined">link</span></button>
                            <span class="toolbar-divider"></span>
                            <button type="button" title="Nhắc tên (@Mention)"><span class="material-symbols-outlined">alternate_email</span></button>
                            <button type="button" title="Gắn mã Task (#Task)"><span class="material-symbols-outlined">tag</span></button>
                            <button type="button" title="Biểu tượng cảm xúc"><span class="material-symbols-outlined">mood</span></button>
                            <button type="button" title="Đính kèm file"><span class="material-symbols-outlined">attach_file</span></button>
                        </div>
                        <button type="button" class="editor-mic" title="Ghi âm giọng nói">
                            <span class="material-symbols-outlined">mic</span>
                        </button>
                    </div>

                    <textarea
                        id="replyTextarea"
                        rows="3"
                        placeholder="Nhập nội dung phản hồi của bạn... Gõ @ để nhắc tên đồng nghiệp, # để gắn mã task..."
                    ></textarea>

                    <div class="reply-footer">
                        <label class="urgent-option">
                            <input id="urgentEmail" type="checkbox">
                            <span>Gửi thông báo khẩn qua Email &amp; Mobile Push</span>
                        </label>

                        <div class="reply-actions">
                            <button class="btn btn-text" id="saveDraftBtn" type="button">Lưu nháp</button>
                            <button class="btn btn-primary" id="sendReplyBtn" type="button">
                                <span>Gửi phản hồi</span>
                                <span class="material-symbols-outlined">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Tự động cuộn xuống tin nhắn cuối cùng
        const msgContainer = document.getElementById("messagesContainer");
        if (msgContainer) {
            msgContainer.scrollTop = msgContainer.scrollHeight;
        }

        // Bắt sự kiện Gửi tin nhắn
        bindSendReplyEvents();
    }

    // ---------------------------------------------------------
    // 6. XỬ LÝ GỬI TIN NHẮN & ĐẨY LUỒNG LÊN ĐẦU
    // ---------------------------------------------------------
    function bindSendReplyEvents() {
        const sendReplyBtn = document.getElementById("sendReplyBtn");
        const replyTextarea = document.getElementById("replyTextarea");

        if (!sendReplyBtn || !replyTextarea) return;

        function handleSend() {
            const text = replyTextarea.value.trim();
            if (!text) {
                showToast("Vui lòng nhập nội dung phản hồi!", true);
                return;
            }

            // Tìm luồng hiện tại
            const threadIndex = threadsData.findIndex(t => t.id === activeThreadId);
            if (threadIndex === -1) return;

            const thread = threadsData[threadIndex];

            // Tạo tin nhắn mới
            const newMsg = {
                id: Date.now(),
                author: "Trần Thị Bình (Bạn)",
                role: "Lead UI/UX Designer",
                roleClass: "primary-role",
                avatar: "TB",
                avatarClass: "primary-avatar",
                time: "Vừa xong",
                isCurrentUser: true,
                content: `<p>${escapeHTML(text)}</p>`
            };

            // Thêm tin nhắn vào luồng
            thread.messages.push(newMsg);
            thread.time = "Vừa xong";
            thread.snippet = `<strong>@Trần Thị Bình</strong>: ${text}`;

            // *** QUAN TRỌNG: ĐẨY CUỘC TRÒ CHUYỆN NÀY LÊN ĐẦU DANH SÁCH ***
            threadsData.splice(threadIndex, 1);
            threadsData.unshift(thread);

            // Re-render
            renderThreadList();
            renderDiscussion();

            showToast("Đã gửi phản hồi thành công!");
        }

        sendReplyBtn.addEventListener("click", handleSend);

        // Hỗ trợ phím tắt Ctrl + Enter để gửi nhanh
        replyTextarea.addEventListener("keydown", function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault();
                handleSend();
            }
        });
    }

    // ---------------------------------------------------------
    // 7. TẠO LUỒNG THẢO LUẬN MỚI & HỆ THỐNG MODAL
    // ---------------------------------------------------------
    if (newThreadBtn) {
        newThreadBtn.addEventListener("click", function () {
            openNewThreadModal();
        });
    }

    function openNewThreadModal() {
        if (!modalOverlay || !modalTitle || !modalBody) return;

        modalTitle.textContent = "Tạo luồng thảo luận mới";

        modalBody.innerHTML = `
            <form id="newThreadForm">
                <div class="form-group">
                    <label>Tiêu đề thảo luận <span style="color:var(--error)">*</span></label>
                    <input type="text" id="modalThreadTitle" class="form-control" placeholder="Nhập tiêu đề luồng thảo luận..." required />
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Dự án liên quan</label>
                        <select id="modalThreadProject" class="form-control">
                            <option value="PRJ-ECOMM-01">PRJ-ECOMM-01 (Sàn TMĐT)</option>
                            <option value="PRJ-HRM-02">PRJ-HRM-02 (Cổng Nhân sự)</option>
                            <option value="ALL">Thảo luận chung</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Độ ưu tiên</label>
                        <select id="modalThreadPriority" class="form-control">
                            <option value="normal">Thông thường</option>
                            <option value="high">Quan trọng</option>
                            <option value="urgent">Khẩn cấp</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label>Hashtag / Kênh tag</label>
                    <input type="text" id="modalThreadTag" class="form-control" placeholder="Ví dụ: #prj-ecomm-uiux" value="#thao-luan-moi" />
                </div>

                <div class="form-group">
                    <label>Nội dung khởi tạo <span style="color:var(--error)">*</span></label>
                    <textarea id="modalThreadContent" class="form-control" rows="3" placeholder="Nhập nội dung bắt đầu thảo luận..." required></textarea>
                </div>
            </form>
        `;

        modalOverlay.classList.add("show");

        // Sự kiện xác nhận trong Modal
        modalConfirm.onclick = function () {
            const titleInput = document.getElementById("modalThreadTitle");
            const projectInput = document.getElementById("modalThreadProject");
            const priorityInput = document.getElementById("modalThreadPriority");
            const tagInput = document.getElementById("modalThreadTag");
            const contentInput = document.getElementById("modalThreadContent");

            if (!titleInput.value.trim() || !contentInput.value.trim()) {
                showToast("Vui lòng điền đầy đủ Tiêu đề và Nội dung!", true);
                return;
            }

            const projVal = projectInput.value;
            const prioVal = priorityInput.value;

            let prioLabel = "Thông thường";
            let prioClass = "neutral";
            let prioIcon = "chat";

            if (prioVal === "urgent") {
                prioLabel = "Khẩn cấp";
                prioClass = "danger";
                prioIcon = "bolt";
            } else if (prioVal === "high") {
                prioLabel = "Quan trọng";
                prioClass = "tertiary";
                prioIcon = "campaign";
            }

            const newThreadId = "TH-" + Math.floor(1000 + Math.random() * 9000);

            // Tạo đối tượng luồng mới
            const newThreadObj = {
                id: newThreadId,
                project: projVal,
                priority: prioVal,
                tag: tagInput.value.trim() || "#thao-luan",
                tagClass: "primary",
                priorityLabel: prioLabel,
                priorityClass: prioClass,
                priorityIcon: prioIcon,
                time: "Vừa xong",
                title: titleInput.value.trim(),
                author: "Trần Thị Bình (Bạn)",
                role: "Lead UI/UX Designer",
                authorAvatar: "TB",
                avatarClass: "primary-avatar",
                taskCode: "",
                unread: false,
                unreadCount: 0,
                fileCount: 0,
                snippet: contentInput.value.trim(),
                searchKey: `${titleInput.value} ${contentInput.value} ${tagInput.value} trần thị bình`.toLowerCase(),
                participants: [
                    { name: "Trần Thị Bình (Bạn)", avatar: "TB", avatarClass: "primary-avatar" }
                ],
                messages: [
                    {
                        id: Date.now(),
                        author: "Trần Thị Bình (Bạn)",
                        role: "Lead UI/UX Designer",
                        roleClass: "primary-role",
                        avatar: "TB",
                        avatarClass: "primary-avatar",
                        time: "Vừa xong",
                        isCurrentUser: true,
                        content: `<p>${escapeHTML(contentInput.value.trim())}</p>`
                    }
                ]
            };

            // *** QUAN TRỌNG: THÊM LUỒNG MỚI VÀO ĐẦU DANH SÁCH ***
            threadsData.unshift(newThreadObj);
            activeThreadId = newThreadId;

            closeModal();
            renderThreadList();
            renderDiscussion();

            showToast("Tạo luồng thảo luận mới thành công!");
        };
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove("show");
        }
    }

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalCancel) modalCancel.addEventListener("click", closeModal);

    // ---------------------------------------------------------
    // 8. BỘ LỌC, TÌM KIẾM VÀ TƯƠNG TÁC KHÁC
    // ---------------------------------------------------------
    if (projectFilter) projectFilter.addEventListener("change", renderThreadList);
    if (priorityFilter) priorityFilter.addEventListener("change", renderThreadList);
    if (threadSearch) threadSearch.addEventListener("input", renderThreadList);

    if (refreshBtn) {
        refreshBtn.addEventListener("click", function () {
            renderThreadList();
            showToast("Đã làm mới dữ liệu!");
        });
    }

    if (markAllReadBtn) {
        markAllReadBtn.addEventListener("click", function () {
            threadsData.forEach(t => t.unread = false);
            renderThreadList();
            showToast("Đã đánh dấu tất cả là đã đọc!");
        });
    }

    // Toggle Sidebar Mobile
    if (mobileMenuBtn && sidebar && sidebarOverlay) {
        mobileMenuBtn.addEventListener("click", function () {
            sidebar.classList.toggle("open");
            sidebarOverlay.classList.toggle("show");
        });

        sidebarOverlay.addEventListener("click", function () {
            sidebar.classList.remove("open");
            sidebarOverlay.classList.remove("show");
        });
    }

    // Sub-filters (Tất cả / Chưa đọc / Đính kèm)
    const subFilterBtns = document.querySelectorAll("#subFilters button");
    subFilterBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            subFilterBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const filterType = this.getAttribute("data-filter");
            if (filterType === "unread") {
                const unreadThreads = threadsData.filter(t => t.unread);
                if (unreadThreads.length > 0) {
                    selectThread(unreadThreads[0].id);
                }
            } else {
                renderThreadList();
            }
        });
    });

    // ---------------------------------------------------------
    // 9. CÁC HÀM BỔ TRỢ (UTILITIES)
    // ---------------------------------------------------------
    function showToast(msg, isError = false) {
        if (!toast || !toastMessage) return;

        toastMessage.textContent = msg;
        if (isError) {
            toast.classList.add("error");
        } else {
            toast.classList.remove("error");
        }

        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Khởi chạy giao diện ban đầu
    renderThreadList();
    renderDiscussion();
});