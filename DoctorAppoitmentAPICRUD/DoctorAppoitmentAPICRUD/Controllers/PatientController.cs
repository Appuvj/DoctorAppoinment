using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;
using DoctorAppoitmentAPICRUD.Repositories;
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

        // GET: api/patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            var patients = await _patientRepository.GetAllAsync();
            return Ok(patients); // Return 200 OK with the list of patients
        }

        // GET: api/patients/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PatientGetByIdDto>> GetPatient(int id)
        {
            var patient = await _patientRepository.GetByIdAsync(id);

            if (patient == null)
            {
                return NotFound(new { message = "Patient not found" }); // Return 404 Not Found if patient does not exist
            }

            return Ok(patient); // Return 200 OK with the patient details
        }

        // POST: api/patients
        [HttpPost]
        public async Task<IActionResult> CreatePatient([FromBody] PatientDto patientDto)
        {
            if (patientDto == null)
            {
                return BadRequest(new { message = "Invalid patient data" }); // Return 400 Bad Request if the provided data is null
            }

            var createdPatient = await _patientRepository.AddAsync(patientDto);

            // Return 201 Created with the URI of the new resource and the created patient
            return CreatedAtAction(nameof(GetPatient), new { id = createdPatient.PatientId }, createdPatient);
        }

        // PUT: api/patients/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatient(int id, [FromBody] PatientDto patientDto)
        {
           

            var updatedPatient = await _patientRepository.UpdateAsync(patientDto,id);
            return Ok(updatedPatient); // Return 200 OK with the updated patient details
        }

        // DELETE: api/patients/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var success = await _patientRepository.DeleteAsync(id);
            if (success)
            {
                return Ok(new { message = "Patient deleted successfully" }); // Return 200 OK with success message
            }
            else
            {
                return NotFound(new { message = "Paitent not found" }); // Return 404 Not Found if booking does not exist
            }
        }

     
    }
}
