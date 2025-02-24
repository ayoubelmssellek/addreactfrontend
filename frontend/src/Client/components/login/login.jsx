import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'
import { useDispatch, useSelector } from 'react-redux';
import { AddUser } from '../../actions/action';


const Login = () => {
  
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({});
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const data=useSelector((state)=>state.client.Users) 
   localStorage.setItem('Users',JSON.stringify(data))
   const Usersdata= localStorage.getItem('Users')?JSON.parse(localStorage.getItem('Users')) :[]

  const handleSubmit = (event) => {
  event.preventDefault();
  let errors = {};

  if (isSignup) {
    if (!name.trim()) errors.name = 'المرجو إدخال الاسم';
    if (!number.trim()) errors.number = 'المرجو إدخال رقم الهاتف';
    if (!password.trim()) errors.password = 'المرجو إدخال كلمة المرور';
    if (!confirmPassword.trim()) errors.confirmPassword = 'المرجو تأكيد كلمة المرور';
    if (password !== confirmPassword) errors.confirmPassword = 'كلمة المرور غير متطابقة';

    if (Object.keys(errors).length > 0) { 
      setError(errors);
      return;
    }

    const ifNumberExist = Usersdata.find((item) => item.Number_Phon === number); 
    if (ifNumberExist) {
      setError({ infowrongorexist: 'رقم الهاتف مسجل مسبقًا' });
      return;
    }

    const newUser = {
      id: Usersdata.length + 1,
      username: name,
      Number_Phon: number,
      password: password,
      role: 'client',
    };
    dispatch(AddUser(newUser));
    localStorage.setItem('loggedInUser',JSON.stringify(newUser))
    navigate('/');
  }else{
    if (!number.trim()) errors.number = 'المرجو إدخال رقم الهاتف';
    if (!password.trim()) errors.password = 'المرجو إدخال كلمة المرور';
    
    if (Object.keys(errors).length > 0) { 
      setError(errors);
      return;
    }
    const findUser=Usersdata.find(item=>item.Number_Phon == number && item.password == password )
        if (!findUser) {
          setError({ infowrongorexist: ' number or password are wrong' });
          return;
        }

        if (findUser) {
          localStorage.setItem('loggedInUser',JSON.stringify(findUser))
          if (findUser.role ==='Directeur' || findUser.role ==='Manager' ) {
             navigate(`/admin/dashboard/${findUser.role}`)
          }else{
            navigate('/');
          }
        }
  }
};


  return (
    <div className="login-container">
      <div className="formContainer">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>{isSignup ? 'إنشاء حساب جديد' : 'تسجيل الدخول إلى حسابك'}</h3>

           {error.infowrongorexist &&  <span className="error-message">{error.infowrongorexist}</span>}
          {isSignup && (
            <div className="input-container">
              <input type="text" placeholder="الاسم" onChange={(e) => setName(e.target.value)} value={name} />
              {error.name && <p style={{ color: "red" }}>{error.name}</p>}
              </div>
          )}

          <div className="input-container">
            <input type="tel" placeholder="أدخل رقم هاتفك" onChange={(e) => setNumber(e.target.value)} value={number} />
            {error.number && <p style={{ color: "red" }}>{error.number}</p>}

          </div>

          <div className="input-container">
            <input type="password" placeholder="أدخل كلمة المرور" onChange={(e) => setPassword(e.target.value)} value={password} />
            {error.password && <p style={{ color: "red" }}>{error.password}</p>}

          </div>

          {isSignup && (
            <div className="input-container">
              <input type="password" placeholder="تأكيد كلمة المرور" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
              {error.confirmPassword && <p style={{ color: "red" }}>{error.confirmPassword}</p>}

            </div>
          )}

          <button className="login" type="submit">
            {isSignup ? 'إنشاء حساب' : 'تسجيل الدخول'}
          </button>

          <p onClick={() => setIsSignup(!isSignup)}>{isSignup ? 'هل لديك حساب؟ سجل الدخول' : 'ليس لديك حساب؟ إنشاء حساب'}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
