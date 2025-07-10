document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye-slash');
    });
    
    // Real-time validation
    document.getElementById('username').addEventListener('input', function() {
        validateUsername();
    });
    
    document.getElementById('password').addEventListener('input', function() {
        validatePassword();
    });
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        
        if (isUsernameValid && isPasswordValid) {
            // Simulate loading
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
            loginBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Login successful! Redirecting to dashboard...');
                loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
                loginBtn.disabled = false;
                
                // Reset form
                loginForm.reset();
            }, 1500);
        }
    });
    
    // Validation functions
    function validateUsername() {
        const username = document.getElementById('username').value.trim();
        const errorElement = document.getElementById('usernameError');
        
        if (username.length === 0) {
            showError(errorElement, 'Username is required');
            return false;
        }
        
        hideError(errorElement);
        return true;
    }
    
    function validatePassword() {
        const password = document.getElementById('password').value;
        const errorElement = document.getElementById('passwordError');
        
        if (password.length === 0) {
            showError(errorElement, 'Password is required');
            return false;
        }
        
        if (password.length < 6) {
            showError(errorElement, 'Password must be at least 6 characters');
            return false;
        }
        
        hideError(errorElement);
        return true;
    }
    
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
        return false;
    }
    
    function hideError(element) {
        element.style.display = 'none';
    }
    
    // Social login handlers
    document.querySelector('.google').addEventListener('click', () => {
        alert('Google login would be implemented here');
    });
    
    document.querySelector('.facebook').addEventListener('click', () => {
        alert('Facebook login would be implemented here');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real app, you would send this to a server
        // For demo, just redirect to home page
        window.location.href = '../';
    });
});