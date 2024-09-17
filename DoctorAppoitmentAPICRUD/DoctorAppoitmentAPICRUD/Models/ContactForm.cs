using System.ComponentModel.DataAnnotations;

namespace DoctorAppoitmentAPICRUD.Models
{
    public class ContactForm
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Message { get; set; }

        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow; // Timestamp of submission
        public bool IsRead { get; set; } // New field to track if the message has been marked as read

    }
}
