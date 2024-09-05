namespace DoctorAppoitmentAPICRUD.Models
{
    public class ImageModel
    {
        public int Id { get; set; }
        public string ImageName { get; set; }
        public byte[] ImageData { get; set; } // Store the image as a byte array
    }
}
