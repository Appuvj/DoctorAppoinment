using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;

namespace DoctorAppoitmentAPICRUD.Repositories
{
    public interface IPatientRepository
    {
        Task<IEnumerable<Patient>> GetAllAsync();
        Task<Patient> GetByIdAsync(int id);
        Task<Patient> AddAsync(PatientDto patientDto);
        Task<Patient> UpdateAsync(PatientDto patientDto, int id);
        Task<bool> DeleteAsync(int id);
    }
}
