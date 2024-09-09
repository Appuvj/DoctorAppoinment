namespace DoctorAppoitmentAPICRUD.Dtos
{
    public class BookingPostDto
    {
        public DateTime BookingDate { get; set; }
        public string Status { get; set; } // e.g., "Pending", "Approved", "Rejected"

        public int? DoctorId { get; set; } // Foreign Key (nullable)

        public int? PatientId { get; set; } // Foreign Key (nullable)

        public string Message { get; set; }

    }
}
