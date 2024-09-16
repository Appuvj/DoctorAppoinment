namespace DoctorAppoitmentAPICRUD.Dtos
{
    public class ForgotPasswordRequest
    {
        public string Email { get; set; }
        public string NewPassword { get; set; }
        public string UserType { get; set; } // "doctor" or "patient"
    }
}
