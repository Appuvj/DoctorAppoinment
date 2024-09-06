namespace DoctorAppoitmentAPICRUD.Dtos
{
    public class PatientRegisterDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Address { get; set; }

        public string Gender { get; set; }

        public string Password { get; set; }


        public IFormFile Image { get; set; }
    }
}
