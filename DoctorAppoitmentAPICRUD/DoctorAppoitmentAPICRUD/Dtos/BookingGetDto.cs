namespace DoctorAppoitmentAPICRUD.Dtos
{
    public class BookingGetDto
    {

        public int BookingId { get; set; }
        public DateTime BookingDate { get; set; }
        public string Status { get; set; }
        public string DoctorName { get; set; } // Flattened
        public string PatientName { get; set; } // Flattened

        public int DoctorId { get; set; }
        public int PatientId { get; set; }
        public string Message { get;set; }
    }
}
