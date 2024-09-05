using DoctorAppoitmentAPICRUD.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DoctorAppoitmentAPICRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly HospitalContext _context;

        public ImageController(HospitalContext context)
        {
            _context = context;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile image)
        {
            if (image == null || image.Length == 0)
                return BadRequest("Image file is empty.");

            using var memoryStream = new MemoryStream();
            await image.CopyToAsync(memoryStream);
            var imageBytes = memoryStream.ToArray();

            // Save the image to the database (as byte array or as a file path)
            var newImage = new Models.ImageModel
            {
                ImageData = imageBytes, // Save as byte[] or
                ImageName = image.FileName // Optionally save the file name
            };

            _context.Images.Add(newImage);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Image uploaded successfully" });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
                return NotFound();

            return File(image.ImageData, "image/jpeg"); // Adjust MIME type if necessary
        }
    }
}
