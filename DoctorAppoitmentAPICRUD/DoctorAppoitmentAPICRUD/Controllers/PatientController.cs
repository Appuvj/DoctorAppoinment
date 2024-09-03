using DoctorAppoitmentAPICRUD.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DoctorAppoitmentAPICRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientRepository _patientRepository;

        public PatientController(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var patients = await _patientRepository.GetAllAsync();
            return Ok(patients);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var patient = await _patientRepository.GetByIdAsync(id);
            if (patient == null)
            {
                return NotFound(new { message = "Patient not found" });
            }
            return Ok(patient);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Patient patient)
        {
            if (patient == null)
            {
                return BadRequest(new { message = "Invalid patient data" });
            }

            var createdPatient = await _patientRepository.AddAsync(patient);
            return CreatedAtAction(nameof(GetById), new { id = createdPatient.PatientId }, createdPatient);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Patient patient)
        {
            if (id != patient.PatientId)
            {
                return BadRequest(new { message = "Patient ID mismatch" });
            }

            var updatedPatient = await _patientRepository.UpdateAsync(patient);
            if (updatedPatient == null)
            {
                return NotFound(new { message = "Patient not found" });
            }

            return Ok(updatedPatient);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _patientRepository.DeleteAsync(id);
            if (success)
            {
                return Ok(new { message = "Booking deleted successfully" }); // Return 200 OK with success message
            }
            else
            {
                return NotFound(new { message = "Booking not found" }); // Return 404 Not Found if booking does not exist
            }
        }
    }
}
