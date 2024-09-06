using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;

namespace DoctorAppoitmentAPICRUD.Repositories
{
    public interface IPatientRepository
    {
        Task<IEnumerable<Patient>> GetAllAsync();
        Task<PatientGetByIdDto> GetByIdAsync(int id);
        Task<Patient> AddAsync(PatientRegisterDto patientRegisterDto);
        Task<Patient> UpdateAsync(PatientRegisterDto patientRegisterDto, int id);
        Task<bool> DeleteAsync(int id);
    }
}
