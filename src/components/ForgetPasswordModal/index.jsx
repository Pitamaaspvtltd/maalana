import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Box, Typography, TextField, Button, Divider } from '@mui/material';
import styles from './ForgetPasswordModal.module.scss';

const ForgetPasswordModal = ({ open, handleClose }) => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState(''); // State to store the new password
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [otpMode, setOtpMode] = useState(false); // State to track OTP mode
    const [resetPasswordMode, setResetPasswordMode] = useState(false); // State to track Reset Password mode

    const handleEmailSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('https://maalana-backend.onrender.com/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.success) {
                setOtpMode(true); // Switch to OTP mode

            } else {
                setError(data.message || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('https://maalana-backend.onrender.com/api/check-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });
            const data = await response.json();
            if (data.success) {
                setResetPasswordMode(true); // Switch to Reset Password mode
                setError('OTP verified successfully. Please enter your new password.');
            } else {
                setError(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPasswordSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('https://maalana-backend.onrender.com/api/reset-password', {  // Assuming there's an endpoint for password reset
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp, newPassword }),
            });
            const data = await response.json();
            if (data.success) {
                setError('Password reset successfully. You can now log in with your new password.');
                handleClose(); // Close the modal after a successful password reset
            } else {
                setError(data.message || 'Failed to reset password. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={styles.modalBox}>
                <Typography variant="h6" className={styles.modalTitle}>
                    {resetPasswordMode ? 'Reset Password' : otpMode ? 'Enter OTP' : 'Forget Password'}
                </Typography>
                <Typography variant='subtitle2' className={styles.modalSubTitle}>
                    {resetPasswordMode ? "Enter your new password" : otpMode ? "Enter the OTP sent to your email address" : "No worries, it happens! Just enter your email address below, and we'll send you an OTP to reset your password."}
                </Typography>
                {resetPasswordMode ? (
                    <TextField
                        label="New Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        className={styles.modalInput}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={Boolean(error)}
                        helperText={error}
                    />
                ) : otpMode ? (
                    <TextField
                        label="OTP"
                        variant="outlined"
                        fullWidth
                        className={styles.modalInput}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        error={Boolean(error)}
                        helperText={error}
                    />
                ) : (
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        className={styles.modalInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={Boolean(error)}
                        helperText={error}
                    />
                )}
                <Box mt={2} display="flex" justifyContent="center">
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: loading || (!email && !otp && !newPassword) ? 'gray' : '#B9D514',
                            ":hover": {
                                backgroundColor: loading || (!email && !otp && !newPassword) ? 'gray' : '#B9D514',
                            },
                            color: loading || (!email && !otp && !newPassword) ? 'white' : 'black',
                        }}
                        onClick={resetPasswordMode ? handleResetPasswordSubmit : otpMode ? handleOtpSubmit : handleEmailSubmit}
                        disabled={loading || (!email && !otp && !newPassword)}
                        className={styles.modalButton}
                    >
                        {loading ? 'Processing...' : resetPasswordMode ? 'Reset Password' : otpMode ? 'Verify OTP' : 'Send OTP'}
                    </Button>
                </Box>
                {!resetPasswordMode && !otpMode && (
                    <Box mt={2} display="flex" justifyContent="center">
                        <Typography variant="subtitle2" className={styles.loginLink}>
                            Remembered your password? <Link to='/login' style={{ color: '#647500' }}>Log In</Link>
                        </Typography>
                    </Box>
                )}
                <Divider sx={{ my: 2 }} />
                <Box mt={2} display="flex" justifyContent="center">
                    <Typography variant="h6" className={styles.emailText}>
                        {resetPasswordMode ? "Enter your new password." : otpMode ? "Enter the OTP sent to your email." : "Check Your Email Inbox!"}
                    </Typography>
                </Box>
            </Box>
        </Modal>
    );
};

export default ForgetPasswordModal;