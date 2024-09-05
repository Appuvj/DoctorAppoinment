namespace DoctorAppoitmentAPICRUD.Dtos
{
    public class DoctorGetById
    {
        public int DoctorId { get; set; }
        public string Name { get; set; }
        public string Specialization { get; set; }
        public string Contact { get; set; }
        public List<DoctorBookingDto> Bookings { get; set; }
    }
}
