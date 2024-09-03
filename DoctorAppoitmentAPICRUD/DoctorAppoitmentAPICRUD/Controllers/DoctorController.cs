using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;
using DoctorAppoitmentAPICRUD.Repositories;
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

        // POST: api/doctors
        [HttpPost]
        public async Task<IActionResult> CreateDoctor([FromBody] DoctorDto doctorDto)
        {
            if (doctorDto == null)
            {
                return BadRequest(new { message = "Invalid doctor data" }); // Return 400 Bad Request if the provided data is null
            }

            var createdDoctor = await _doctorRepository.AddAsync(doctorDto);

            // Return 201 Created with the URI of the new resource and the created doctor
            return CreatedAtAction(nameof(GetDoctor), new { id = createdDoctor.DoctorId }, createdDoctor);
        }

        // PUT: api/doctors/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, [FromBody] DoctorDto doctorDto)
        {
           

            var updatedDoctor = await _doctorRepository.UpdateAsync(doctorDto,id);
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
          
            return NotFound(new { message = "Doctor not found" }); // Return 404 Not Found if doctor does not exist
            
        }
    }
}
