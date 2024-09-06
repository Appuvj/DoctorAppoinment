namespace DoctorAppoitmentAPICRUD.Models
{
    public class Patient
    {
        public int PatientId { get; set; } // Primary Key
        public string Name { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Address { get; set; }

        public string Gender { get; set; }

        public string Password { get; set; }


        public byte[] ImageData { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>(); // Navigation property
    }
}
