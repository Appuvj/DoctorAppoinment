using DoctorAppoitmentAPICRUD.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DoctorAppoitmentAPICRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorRepository _doctorRepository;

        public DoctorController(IDoctorRepository doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }

        // GET: api/doctors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            var doctors = await _doctorRepository.GetAllAsync();
            return Ok(doctors); // Return 200 OK with the list of doctors
        }

        // GET: api/doctors/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> GetDoctor(int id)
        {
            var doctor = await _doctorRepository.GetByIdAsync(id);

            if (doctor == null)
            {
                return NotFound(new { message = "Doctor not found" }); // Return 404 Not Found if doctor does not exist
            }

            return Ok(doctor); // Return 200 OK with the doctor details
        }

        // PUT: api/doctors/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, Doctor doctor)
        {
            if (id != doctor.DoctorId)
            {
                return BadRequest(new { message = "Doctor ID mismatch" }); // Return 400 Bad Request if the ID in URL doesn't match the ID in the body
            }

            var updatedDoctor = await _doctorRepository.UpdateAsync(doctor);
            return Ok(updatedDoctor); // Return 200 OK with the updated doctor details
        }

        // DELETE: api/doctors/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var success = await _doctorRepository.DeleteAsync(id);
            if (success)
            {
                return Ok(new { message = "Doctor deleted successfully" }); // Return 200 OK with success message
            }
            else
            {
                return NotFound(new { message = "Doctor not found" }); // Return 404 Not Found if doctor does not exist
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateDoctor(Doctor doctor)
        {
            if (doctor == null)
            {
                return BadRequest(new { message = "Invalid doctor data" }); // Return 400 Bad Request if the provided data is null
            }

            // Optionally validate the doctor object here (e.g., check required fields)

            // Add the doctor to the repository
            await _doctorRepository.AddAsync(doctor);

            // Return 201 Created with the URI of the new resource and the created doctor
            return CreatedAtAction(nameof(GetDoctor), new { id = doctor.DoctorId }, doctor);
        }

    }
}
