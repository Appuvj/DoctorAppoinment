namespace DoctorAppoitmentAPICRUD.Models
{
    public class Booking
    {
        public int BookingId { get; set; } // Primary Key
        public DateTime BookingDate { get; set; }
        public string Status { get; set; } // e.g., "Pending", "Approved", "Rejected"

        public int? DoctorId { get; set; } // Foreign Key (nullable)
        public Doctor Doctor { get; set; } // Navigation property

        public int? PatientId { get; set; } // Foreign Key (nullable)
        public Patient Patient { get; set; } // Navigation property

        public string Message { get; set; }
        public byte[]? ImageData { get; set; }
    }
}
