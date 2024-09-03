namespace DoctorAppoitmentAPICRUD.Models
{
    public class Patient
    {
        public int PatientId { get; set; } // Primary Key
        public string Name { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }

        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>(); // Navigation property
    }
}
