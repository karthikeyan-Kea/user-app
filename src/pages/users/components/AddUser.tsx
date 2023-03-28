import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { YesNoEnum, CreateUser } from '../../../types/user';
import { useAppDispatch } from '../../../store/store';
import { addUser } from '../../../store/slices/users.slice';

interface Props {
  closeModal: () => void;
}
const AddUser = ({ closeModal }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.keyCode === 27) {
        closeModal();
      }
    }
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  const initValue: CreateUser = {
    email: '',
    name: '',
    address: '',
    entity: '',
    company: YesNoEnum.YES,
    taxNumber: '',
    terms_of_service: false,
  };

  const userSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is Required'),
    name: Yup.string().required('Name is Required'),
    address: Yup.string().required('Address is Required'),
    company: Yup.mixed<YesNoEnum>().oneOf(Object.values(YesNoEnum), 'Please select a taxpayer').required(),
    entity: Yup.string().required('Entity is Required'),
    taxpayer: Yup.string().when('company', {
      is: (company: YesNoEnum) => company === YesNoEnum.YES,
      then: Yup.string().required(),
    }),
    taxNumber: Yup.string().when('taxpayer', {
      is: (taxpayer: YesNoEnum) => taxpayer === YesNoEnum.YES,
      then: Yup.string().required('Tax Number is required'),
    }),
    terms_of_service: Yup.boolean().oneOf([true], 'Terms of Service is required'),
  });

  const saveUser = (user: CreateUser) => {
    dispatch(addUser({ ...user }));
    closeModal();
  };

  const userForm = useFormik<CreateUser>({
    initialValues: initValue,
    validationSchema: userSchema,
    onSubmit: value => {
      saveUser(value);
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = userForm;

  return (
    <div className="user-modal">
      <div className="modal-container">
        <div className="modal-title">
          <h3>Add User</h3>
          <div className="close-icon" onClick={closeModal}>
            <span>X</span>
          </div>
        </div>

        <div className="modal-content">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="form-label">Email</label>
              <input name="email" placeholder="Email" className="form-field" value={values.email} type="email" onChange={handleChange} onBlur={handleBlur} />
              {errors.email && touched.email ? <div className="form-error">{errors.email}</div> : null}
            </div>
            <div className="form-control">
              <label className="form-label">Name</label>
              <input name="name" placeholder="Name" className="form-field" value={values.name} onChange={handleChange} onBlur={handleBlur} />
              {errors.name && touched.name ? <div className="form-error">{errors.name}</div> : null}
            </div>
            <div className="form-control">
              <label className="form-label">Address</label>
              <textarea name="address" placeholder="Address" className="form-field" value={values.address} onChange={handleChange} onBlur={handleBlur} />
              {errors.address && touched.address ? <div className="form-error">{errors.address}</div> : null}
            </div>
            <div className="form-control">
              <label className="form-label">Company</label>
              <select name="company" className="form-field" value={values.company} onChange={userForm.handleChange} onBlur={userForm.handleBlur}>
                <option value="">Select Company</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.company && touched.company ? <div className="form-error">{errors.company}</div> : null}
            </div>
            <div className="form-control">
              <label className="form-label">{values.company === YesNoEnum.NO ? 'Name & surname' : 'Entity'}</label>
              <input
                name="entity"
                placeholder={values.company === YesNoEnum.NO ? 'Name & surname' : 'Entity'}
                className="form-field"
                value={values.entity}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.entity && touched.entity ? <div className="form-error">{errors.entity}</div> : null}
            </div>
            {values.company === YesNoEnum.YES && (
              <>
                <div className="form-control">
                  <label className="form-label">Taxpayer</label>
                  <select name="taxpayer" className="form-field" value={values.taxpayer} onChange={userForm.handleChange} onBlur={userForm.handleBlur}>
                    <option value="">Select Taxpayer</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {errors.taxpayer && touched.taxpayer ? <div className="form-error">{errors.taxpayer}</div> : null}
                </div>
                {values.taxpayer === YesNoEnum.YES && (
                  <div className="form-control">
                    <label className="form-label">Tax Number</label>
                    <input name="taxNumber" placeholder="Tax Number" className="form-field" value={values.taxNumber} onChange={handleChange} onBlur={handleBlur} />
                    {errors.taxNumber && touched.taxNumber ? <div className="form-error">{errors.taxNumber}</div> : null}
                  </div>
                )}
              </>
            )}
            <div className="form-control">
              <input name="terms_of_service" type="checkbox" className="terms" value={values.taxNumber} onChange={handleChange} onBlur={handleBlur} />
              <label>terms of service</label>

              {errors.terms_of_service && touched.terms_of_service ? <div className="form-error">{errors.terms_of_service}</div> : null}
            </div>
            <div>
              <button type="submit" className="btn btn-save">
                Save
              </button>
              <button type="button" className="btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
