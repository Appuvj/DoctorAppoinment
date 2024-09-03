using DoctorAppoitmentAPICRUD.Models;

namespace DoctorAppoitmentAPICRUD.Dtos
{
    public class BookingDto
    {
        public DateTime BookingDate { get; set; }
        public string Status { get; set; } // e.g., "Pending", "Approved", "Rejected"

        public int? DoctorId { get; set; } // Foreign Key (nullable)

        public int? PatientId { get; set; } // Foreign Key (nullable)
    }
}
