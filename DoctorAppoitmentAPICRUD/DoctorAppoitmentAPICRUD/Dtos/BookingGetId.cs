namespace DoctorAppoitmentAPICRUD.Dtos
{
    public class BookingGetId
    {
        public int BookingId { get; set; }
        public DateTime BookingDate { get; set; }
        public string Status { get; set; }
        public int? DoctorId { get; set; }
        public string DoctorName { get; set; }
        public int? PatientId { get; set; }
        public string PatientName { get; set; }

        public string DoctorImage { get; set; }

        public string Message { get; set; }
        public string Prescription { get; set; }
    }
}
