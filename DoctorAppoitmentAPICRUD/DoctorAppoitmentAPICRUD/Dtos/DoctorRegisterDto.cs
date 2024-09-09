namespace DoctorAppoitmentAPICRUD.Dtos
{
    public class DoctorRegisterDto
    {
        public string Name { get; set; }
        public string Specialization { get; set; }
        public string Contact { get; set; }

        public string Location { get; set; }
        public string Email { get; set; }

        public string Organization { get; set; }

        public string Gender { get; set; }

        public string Password { get; set; }

        public DateTime AvailableFrom { get; set; }

        public IFormFile Image { get; set; }
    }
}
