namespace DoctorAppoitmentAPICRUD.Models
{
    public class Doctor
    {
        public int DoctorId { get; set; } // Primary Key
        public string Name { get; set; }
        public string Specialization { get; set; }
        public string Contact { get; set; }

        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();// Navigation property
    }
}
