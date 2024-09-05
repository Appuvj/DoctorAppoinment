namespace DoctorAppoitmentAPICRUD.Dtos
{
    public class PatientGetByIdDto
    {
        public int PatientId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public List<BookingGetId> Bookings { get; set; }
    }
}
