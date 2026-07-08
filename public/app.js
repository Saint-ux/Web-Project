const API_URL = 'http://localhost:5000/api';
let jwtToken = localStorage.getItem('token') || '';


if (jwtToken) {
    document.getElementById('dashboardSection').style.display = 'block';
    
    fetchCourses(); 
}

async function handleLogin() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const statusText = document.getElementById('authStatus');

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            jwtToken = data.token;
            localStorage.setItem('token', data.token); 
            statusText.style.color = 'green';
            statusText.innerText = `Welcome back, ${data.user.name}! Access Granted.`;
            document.getElementById('dashboardSection').style.display = 'block';
            fetchCourses();
        } else {
            statusText.style.color = 'red';
            statusText.innerText = data.message || 'Authentication rejected.';
        }
    } catch (err) {
        statusText.innerText = 'Cannot reach API Gateway server.';
    }
}

async function fetchCourses() {
    const container = document.getElementById('courseContainer');
    container.innerHTML = 'Loading course directory...';

    try {
        const response = await fetch(`${API_URL}/courses`, {
            headers: { 'Authorization': `Bearer ${jwtToken}` } 
        });
        const courses = await response.json();

        container.innerHTML = '';
        if (courses.length === 0) {
            container.innerHTML = '<p>No courses active in relational inventory catalog.</p>';
            return;
        }

        courses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'course-card';
            card.innerHTML = `
                <h4>${course.title} (Instructor: ${course.instructor})</h4>
                <p>${course.description}</p>
                <button onclick="enrollCourse(${course.id})">Enroll in Course</button>
            `;
            container.appendChild(card);
        });
    } catch (err) {
        container.innerHTML = '<p style="color:red;">Failed to retrieve collection assets.</p>';
    }
}

async function handleCreateCourse() {
    const title = document.getElementById('courseTitle').value;
    const description = document.getElementById('courseDesc').value;
    const instructor = document.getElementById('courseInstructor').value;
    const statusText = document.getElementById('courseStatus');

    try {
        const response = await fetch(`${API_URL}/courses/create`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({ title, description, instructor })
        });

        const data = await response.json();

        if (response.ok) {
            statusText.style.color = 'green';
            statusText.innerText = 'Course successfully populated!';
            fetchCourses();
        } else {
            statusText.style.color = 'red';
            statusText.innerText = `Authorization Failure: ${data.message}`; 
        }
    } catch (err) {
        statusText.innerText = 'Network request dispatch error.';
    }
}

async function enrollCourse(courseId) {
    try {
        const response = await fetch(`${API_URL}/courses/enroll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({ courseId })
        });
        const data = await response.json();
        alert(data.message);
    } catch (err) {
        console.error(err);
    }
}

async function handleRegister() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const statusText = document.getElementById('authStatus');

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: 'Test Student', 
                email: email, 
                password: password,
                role: 'admin' 
            })
        });

        const data = await response.json();

        if (response.ok) {
            statusText.style.color = 'green';
            statusText.innerText = 'Registration successful! Now click Login.';
        } else {
            statusText.style.color = 'red';
            statusText.innerText = data.message || 'Registration failed.';
        }
    } catch (err) {
        statusText.innerText = 'Cannot reach API Gateway server.';
    }
}

// Inside public/app.js at the absolute bottom
function handleLogout() {
    // 1. Wipe out the token from the browser session storage
    localStorage.removeItem('token');
    jwtToken = '';

    // 2. Clear any success messages and input fields
    document.getElementById('authStatus').innerText = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('passwordInput').value = '';

    // 3. Hide the protected dashboard view again
    document.getElementById('dashboardSection').style.display = 'none';
    
    alert('Logged out successfully. Secure session terminated.');
}