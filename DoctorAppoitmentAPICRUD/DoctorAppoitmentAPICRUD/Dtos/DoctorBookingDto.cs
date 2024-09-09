namespace DoctorAppoitmentAPICRUD.Dtos
{
    public class DoctorBookingDto
    {
        public int BookingId { get; set; }
        public DateTime BookingDate { get; set; }
        public string PatientName { get; set; }

        public string Status { get; set; }

        public string PatientImage { get; set; }

        public string Prescription { get; set; }

        public int? DoctorId { get; set; }

        public string Message { get;set; }
        public int? PatientId { get; set; }
    }
}
