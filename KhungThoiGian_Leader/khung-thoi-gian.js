document.addEventListener('DOMContentLoaded', () => {
    // Current Timeline View States
    let currentScale = 'week'; // 'day', 'week', 'month', 'quarter'
    let baseDate = new Date(2025, 5, 15); // Default base date: June 15, 2025

    // Task Data Model
    const tasksData = [
        {
            id: '1.1',
            project: 'ecomm',
            title: '1.1 Thiết kế UI/UX System',
            phase: 'design',
            start: new Date(2025, 4, 1),
            end: new Date(2025, 4, 25),
            progress: 100,
            status: 'completed',
            barClass: 'completed-bar',
            label: 'UI/UX Design System',
            milestone: { title: 'Mốc bàn giao Design Tokens', class: 'green-milestone', icon: 'square' }
        },
        {
            id: '1.2',
            project: 'ecomm',
            title: '1.2 Module Giỏ hàng & VNPay',
            phase: 'dev',
            start: new Date(2025, 4, 26),
            end: new Date(2025, 5, 20),
            progress: 75,
            status: 'running',
            barClass: 'running-bar',
            label: 'Giỏ hàng & VNPay',
            resizable: true,
            dependency: true
        },
        {
            id: '1.3',
            project: 'ecomm',
            title: '1.3 Stress test 50k CCU & UAT',
            phase: 'test',
            start: new Date(2025, 5, 21),
            end: new Date(2025, 6, 5),
            progress: 10,
            status: 'waiting',
            barClass: 'waiting-bar',
            label: 'Stress test & UAT'
        },
        {
            id: '2.1',
            project: 'hrm',
            title: '2.1 Schema CSDL & IAM Security',
            phase: 'design',
            start: new Date(2025, 4, 15),
            end: new Date(2025, 5, 5),
            progress: 100,
            status: 'completed',
            barClass: 'completed-bar',
            label: 'DB Schema & IAM',
            milestone: { title: 'Nghiệm thu Schema Core', class: 'green-milestone', icon: 'square' }
        },
        {
            id: '2.2',
            project: 'hrm',
            title: '2.2 Module Chấm công tự động',
            phase: 'dev',
            start: new Date(2025, 5, 6),
            end: new Date(2025, 5, 28),
            progress: 45,
            status: 'running',
            barClass: 'running-bar',
            label: 'Chấm công & Lương',
            resizable: true
        },
        {
            id: '3.1',
            project: 'edu',
            title: '3.1 Tích hợp API Thi trắc nghiệm',
            phase: 'dev',
            start: new Date(2025, 4, 10),
            end: new Date(2025, 5, 8),
            progress: 40,
            status: 'delayed',
            barClass: 'delayed-bar',
            label: 'API Thi Trắc nghiệm (Trễ 7 ngày)',
            resizable: true
        },
        {
            id: '4.1',
            project: 'infra',
            title: '4.1 Cụm K8s Multi-Region Cluster',
            phase: 'deploy',
            start: new Date(2025, 4, 1),
            end: new Date(2025, 4, 28),
            progress: 100,
            status: 'completed',
            barClass: 'completed-bar',
            label: 'K8s Multi-Region Cluster Deploy',
            milestone: { title: 'Go-live Production Infrastructure', class: 'star-milestone', icon: 'star' }
        }
    ];

    // Map rows matching left side structure
    const projectRows = [
        { id: 'ecomm', class: '' },
        { id: 'task-1.1' },
        { id: 'task-1.2' },
        { id: 'task-1.3' },
        { id: 'hrm', class: '' },
        { id: 'task-2.1' },
        { id: 'task-2.2' },
        { id: 'edu', class: 'delayed-project' },
        { id: 'task-3.1' },
        { id: 'infra', class: '' },
        { id: 'task-4.1' }
    ];

    // Bind scale tabs (Ngày, Tuần, Tháng, Quý)
    const scaleButtons = document.querySelectorAll('.scale-tabs button');
    scaleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            scaleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentScale = btn.getAttribute('data-scale');
            updateTimelineView();
        });
    });

    // Date navigation buttons (Trước, Sau, Hôm nay)
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    const todayBtn = document.getElementById('todayButton');

    if (prevBtn) prevBtn.addEventListener('click', () => navigateDate(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateDate(1));
    if (todayBtn) {
        todayBtn.addEventListener('click', () => {
            baseDate = new Date(2025, 5, 15);
            updateTimelineView();
        });
    }

    function navigateDate(direction) {
        if (currentScale === 'day') {
            baseDate.setDate(baseDate.getDate() + (direction * 7));
        } else if (currentScale === 'week' || currentScale === 'month') {
            baseDate.setMonth(baseDate.getMonth() + direction);
        } else if (currentScale === 'quarter') {
            baseDate.setFullYear(baseDate.getFullYear() + direction);
        }
        updateTimelineView();
    }

    // Core Function: Render dynamic right-side timeline chart based on scale & time
    function updateTimelineView() {
        const ganttRight = document.getElementById('ganttRight');
        const currentMonthLabel = document.getElementById('currentMonth');
        if (!ganttRight || !currentMonthLabel) return;

        let headerHTML = '';
        let gridCols = 12;
        let rangeStart, rangeEnd;

        const year = baseDate.getFullYear();
        const month = baseDate.getMonth();

        if (currentScale === 'day') {
            // Day Scale: Render Days of the current month
            currentMonthLabel.textContent = `Tháng ${String(month + 1).padStart(2, '0')} / ${year}`;
            rangeStart = new Date(year, month, 1);
            rangeEnd = new Date(year, month + 1, 0);
            const totalDays = rangeEnd.getDate();
            gridCols = totalDays;

            let daysHTML = '';
            for (let d = 1; d <= totalDays; d++) {
                const isToday = (d === 15 && month === 5 && year === 2025);
                daysHTML += `
                    <div style="padding: 6px 0; border-right: 1px solid rgba(195, 198, 215, 0.4); font-size: 9px; text-align: center; ${isToday ? 'background: rgba(37, 99, 235, 0.15); font-weight:700; color: var(--primary);' : ''}">
                        ${d}
                    </div>`;
            }

            headerHTML = `
                <div class="timeline-header">
                    <div class="months-row" style="grid-template-columns: 1fr;">
                        <div class="current">Lịch biểu Chi tiết Tháng ${String(month + 1).padStart(2, '0')} / ${year}</div>
                    </div>
                    <div class="weeks-row" style="grid-template-columns: repeat(${totalDays}, 1fr);">
                        ${daysHTML}
                    </div>
                </div>
            `;
        } else if (currentScale === 'week') {
            // Week Scale: Render 3 Months, 12 Weeks
            currentMonthLabel.textContent = `Tháng ${String(month + 1).padStart(2, '0')} / ${year}`;

            const prevM = new Date(year, month - 1, 1);
            const currM = new Date(year, month, 1);
            const nextM = new Date(year, month + 1, 1);

            rangeStart = prevM;
            rangeEnd = new Date(year, month + 2, 0);
            gridCols = 12;

            headerHTML = `
                <div class="timeline-header">
                    <div class="months-row">
                        <div>Tháng ${String(prevM.getMonth() + 1).padStart(2, '0')} / ${prevM.getFullYear()}</div>
                        <div class="current">Tháng ${String(currM.getMonth() + 1).padStart(2, '0')} / ${currM.getFullYear()} (Hiện tại)</div>
                        <div>Tháng ${String(nextM.getMonth() + 1).padStart(2, '0')} / ${nextM.getFullYear()}</div>
                    </div>
                    <div class="weeks-row">
                        <div>T1 (01-07)</div><div>T2 (08-14)</div><div>T3 (15-21)</div><div>T4 (22-31)</div>
                        <div>T1 (01-07)</div><div class="active-week">T2 (08-14)</div><div class="active-week today-week">T3 (15-21)<span class="today-dot"></span></div><div>T4 (22-30)</div>
                        <div>T1 (01-07)</div><div>T2 (08-14)</div><div>T3 (15-21)</div><div>T4 (22-31)</div>
                    </div>
                </div>
            `;
        } else if (currentScale === 'month') {
            // Month Scale: Render 12 Months of the Year
            currentMonthLabel.textContent = `Năm ${year}`;
            rangeStart = new Date(year, 0, 1);
            rangeEnd = new Date(year, 11, 31);
            gridCols = 12;

            let monthsSubHTML = '';
            for (let m = 1; m <= 12; m++) {
                const isCurrent = (m === (month + 1));
                monthsSubHTML += `
                    <div style="border-right: 1px solid rgba(195, 198, 215, 0.4); padding: 6px 2px; font-size: 9px; ${isCurrent ? 'background: rgba(37, 99, 235, 0.1); font-weight:700; color: var(--primary);' : ''}">
                        Thg ${m}
                    </div>`;
            }

            headerHTML = `
                <div class="timeline-header">
                    <div class="months-row" style="grid-template-columns: 1fr;">
                        <div class="current">Lộ trình tổng quan Năm ${year}</div>
                    </div>
                    <div class="weeks-row" style="grid-template-columns: repeat(12, 1fr);">
                        ${monthsSubHTML}
                    </div>
                </div>
            `;
        } else if (currentScale === 'quarter') {
            // Quarter Scale: Render 8 Quarters (2 Years)
            currentMonthLabel.textContent = `Giai đoạn ${year} - ${year + 1}`;
            rangeStart = new Date(year, 0, 1);
            rangeEnd = new Date(year + 1, 11, 31);
            gridCols = 8;

            headerHTML = `
                <div class="timeline-header">
                    <div class="months-row" style="grid-template-columns: 1fr 1fr;">
                        <div>Năm ${year}</div>
                        <div class="current">Năm ${year + 1}</div>
                    </div>
                    <div class="weeks-row" style="grid-template-columns: repeat(8, 1fr);">
                        <div class="active-week">Q1/${year.toString().slice(-2)}</div>
                        <div class="active-week today-week">Q2/${year.toString().slice(-2)} <span class="today-dot"></span></div>
                        <div>Q3/${year.toString().slice(-2)}</div>
                        <div>Q4/${year.toString().slice(-2)}</div>
                        <div>Q1/${(year+1).toString().slice(-2)}</div>
                        <div>Q2/${(year+1).toString().slice(-2)}</div>
                        <div>Q3/${(year+1).toString().slice(-2)}</div>
                        <div>Q4/${(year+1).toString().slice(-2)}</div>
                    </div>
                </div>
            `;
        }

        // Calculate positions dynamically
        const totalTimeSpan = rangeEnd - rangeStart;

        function getPosition(startDate, endDate) {
            let leftPercent = ((startDate - rangeStart) / totalTimeSpan) * 100;
            let widthPercent = ((endDate - startDate) / totalTimeSpan) * 100;

            if (leftPercent < 0) {
                widthPercent += leftPercent;
                leftPercent = 0;
            }
            if (leftPercent + widthPercent > 100) {
                widthPercent = 100 - leftPercent;
            }
            if (widthPercent < 2) widthPercent = 2; // Keep readable width

            return {
                left: leftPercent.toFixed(1),
                width: widthPercent.toFixed(1)
            };
        }

        // Generate Body HTML
        let bodyHTML = `<div class="timeline-body"><div class="grid-lines" style="grid-template-columns: repeat(${gridCols}, 1fr);"></div>`;

        // Check and position today marker line (15/06/2025)
        const todayDate = new Date(2025, 5, 15);
        let todayLineHTML = '';
        if (todayDate >= rangeStart && todayDate <= rangeEnd) {
            const todayPos = (((todayDate - rangeStart) / totalTimeSpan) * 100).toFixed(1);
            todayLineHTML = `
                <div class="today-line" style="left: ${todayPos}%;">
                    <span>Hôm nay (15/06)</span>
                </div>`;
        }

        // Render project & task timeline rows
        projectRows.forEach(row => {
            if (row.id === 'ecomm') {
                bodyHTML += `
                    <div class="timeline-project">
                        <div class="project-bar"><div class="project-bar-fill" style="width:70%"></div></div>
                    </div>`;
            } else if (row.id === 'hrm') {
                bodyHTML += `
                    <div class="timeline-project">
                        <div class="project-bar project-two"><div class="project-bar-fill" style="width:60%"></div></div>
                    </div>`;
            } else if (row.id === 'edu') {
                bodyHTML += `
                    <div class="timeline-project ${row.class}">
                        <div class="project-bar project-three"><div class="project-bar-fill red-fill" style="width:40%"></div></div>
                    </div>`;
            } else if (row.id === 'infra') {
                bodyHTML += `
                    <div class="timeline-project">
                        <div class="project-bar project-four"><div class="project-bar-fill green-fill" style="width:100%"></div></div>
                    </div>`;
            } else {
                const taskId = row.id.replace('task-', '');
                const task = tasksData.find(t => t.id === taskId);
                if (task) {
                    const pos = getPosition(task.start, task.end);
                    const milestonePos = (parseFloat(pos.left) + parseFloat(pos.width)).toFixed(1);

                    bodyHTML += `<div class="timeline-task">`;

                    if (task.dependency) {
                        bodyHTML += `<div class="dependency-line" style="left: ${pos.left}%;"></div>`;
                    }

                    if (task.status === 'running') {
                        bodyHTML += `
                            <div class="gantt-bar ${task.barClass} ${task.resizable ? 'resizable-bar' : ''}" style="left:${pos.left}%; width:${pos.width}%" data-task="${task.id}">
                                <div class="bar-fill" style="width:${task.progress}%">${task.label}</div>
                                <span class="bar-percent">${task.progress}%</span>
                                ${task.resizable ? '<span class="resize-handle"></span>' : ''}
                            </div>`;
                    } else if (task.status === 'completed') {
                        bodyHTML += `
                            <div class="gantt-bar ${task.barClass}" style="left:${pos.left}%; width:${pos.width}%" data-task="${task.id}">
                                <span>
                                    <span class="material-symbols-outlined">check_circle</span>
                                    ${task.label}
                                </span>
                                <b>100%</b>
                            </div>`;
                    } else if (task.status === 'delayed') {
                        bodyHTML += `
                            <div class="gantt-bar ${task.barClass} ${task.resizable ? 'resizable-bar' : ''}" style="left:${pos.left}%; width:${pos.width}%" data-task="${task.id}">
                                <span>
                                    <span class="material-symbols-outlined">warning</span>
                                    ${task.label}
                                </span>
                                <b>${task.progress}%</b>
                                ${task.resizable ? '<span class="resize-handle"></span>' : ''}
                            </div>`;
                    } else {
                        bodyHTML += `
                            <div class="gantt-bar ${task.barClass}" style="left:${pos.left}%; width:${pos.width}%" data-task="${task.id}">
                                ${task.label}
                            </div>`;
                    }

                    if (task.milestone) {
                        bodyHTML += `
                            <div class="milestone ${task.milestone.class}" style="left:${milestonePos}%" title="${task.milestone.title}">
                                <span class="material-symbols-outlined">${task.milestone.icon}</span>
                            </div>`;
                    }

                    bodyHTML += `</div>`;
                }
            }
        });

        bodyHTML += `</div>`;

        // Append to Gantt Right area
        ganttRight.innerHTML = `
            <div class="gantt-timeline">
                ${headerHTML}
                ${todayLineHTML}
                ${bodyHTML}
            </div>
        `;
    }

    // Initialize Chart
    updateTimelineView();

    // -------------------------------------------------------------
    // Additional Interactive Controls (Filters, Modals, Toasts)
    // -------------------------------------------------------------

    // Search and Filter logic
    const timelineSearch = document.getElementById('timelineSearch');
    const projectFilter = document.getElementById('projectFilter');
    const phaseFilter = document.getElementById('phaseFilter');

    function filterGantt() {
        const query = timelineSearch ? timelineSearch.value.toLowerCase().trim() : '';
        const selectedProj = projectFilter ? projectFilter.value : 'all';
        const selectedPhase = phaseFilter ? phaseFilter.value : 'all';

        const ganttTaskRows = document.querySelectorAll('.gantt-task-row');
        ganttTaskRows.forEach(row => {
            const taskName = row.getAttribute('data-task')?.toLowerCase() || '';
            const proj = row.getAttribute('data-project');
            const phase = row.getAttribute('data-phase');

            const matchQuery = !query || taskName.includes(query);
            const matchProj = selectedProj === 'all' || proj === selectedProj;
            const matchPhase = selectedPhase === 'all' || phase === selectedPhase;

            if (matchQuery && matchProj && matchPhase) {
                row.classList.remove('is-hidden');
            } else {
                row.classList.add('is-hidden');
            }
        });
    }

    if (timelineSearch) timelineSearch.addEventListener('input', filterGantt);
    if (projectFilter) projectFilter.addEventListener('change', filterGantt);
    if (phaseFilter) phaseFilter.addEventListener('change', filterGantt);

    // Refresh animation
    const refreshBtn = document.getElementById('refreshButton');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.classList.add('rotating');
            setTimeout(() => {
                refreshBtn.classList.remove('rotating');
                updateTimelineView();
                showToast('Đã làm mới dữ liệu biểu đồ Gantt');
            }, 600);
        });
    }

    // Modal Handlers
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    }

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetModal = btn.getAttribute('data-close-modal');
            closeModal(targetModal);
        });
    });

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) backdrop.classList.remove('active');
        });
    });

    const createMilestoneBtn = document.getElementById('createMilestoneButton');
    if (createMilestoneBtn) {
        createMilestoneBtn.addEventListener('click', () => openModal('createMilestoneModal'));
    }

    const notificationBtn = document.getElementById('notificationButton');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => openModal('notificationModal'));
    }

    const helpBtn = document.getElementById('helpButton');
    if (helpBtn) {
        helpBtn.addEventListener('click', () => openModal('helpModal'));
    }

    const wikiBtn = document.getElementById('wikiButton');
    if (wikiBtn) {
        wikiBtn.addEventListener('click', () => openModal('helpModal'));
    }

    const createMilestoneForm = document.getElementById('createMilestoneForm');
    if (createMilestoneForm) {
        createMilestoneForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal('createMilestoneModal');
            showToast('Đã tạo mốc thời gian mới thành công!');
            createMilestoneForm.reset();
        });
    }

    // Toast Notifications
    const liveToast = document.getElementById('liveToast');
    const toastClose = document.getElementById('toastClose');

    if (toastClose && liveToast) {
        toastClose.addEventListener('click', () => {
            liveToast.classList.add('hidden');
        });
    }

    function showToast(message) {
        if (!liveToast) return;
        const contentStrong = liveToast.querySelector('.toast-content strong');
        if (contentStrong) contentStrong.textContent = message;
        liveToast.classList.remove('hidden');
        setTimeout(() => {
            liveToast.classList.add('hidden');
        }, 4000);
    }

    // Milestone action buttons
    document.querySelectorAll('.small-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            const target = btn.getAttribute('data-target');

            if (action === 'approve') {
                showToast(`Đã nghiệm thu mốc số 0${target} thành công!`);
                btn.disabled = true;
                btn.innerHTML = `<span class="material-symbols-outlined">check</span> Đã nghiệm thu`;
            } else if (action === 'postpone' || action === 'reset') {
                const targetInput = document.getElementById('postponeTargetId');
                if (targetInput) targetInput.value = target;
                openModal('postponeModal');
            }
        });
    });

    const confirmPostponeBtn = document.getElementById('confirmPostponeBtn');
    if (confirmPostponeBtn) {
        confirmPostponeBtn.addEventListener('click', () => {
            const targetId = document.getElementById('postponeTargetId').value;
            const newDate = document.getElementById('postponeNewDate').value;
            closeModal('postponeModal');
            const dateElem = document.getElementById(`m${targetId}-date`);
            if (dateElem) dateElem.textContent = newDate;
            showToast(`Đã cập nhật hạn chót mốc 0${targetId} sang ${newDate}`);
        });
    }
});