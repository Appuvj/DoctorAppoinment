namespace DoctorAppoitmentAPICRUD.Dtos
{
    public class DoctorBookingDto
    {
        public int BookingId { get; set; }
        public DateTime BookingDate { get; set; }
        public string PatientName { get; set; }

        public string Status { get; set; }

        public string PatientImage { get; set; }
    }
}
