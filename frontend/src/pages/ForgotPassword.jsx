import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/login/Layout';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import Button from '../components/ui/Button';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    // Lógica para enviar el correo
    setStep(2);
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    // Lógica para verificar el código
    setStep(3);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Lógica para cambiar la contraseña
    setStep(4);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm w-full">
          <form onSubmit={handleSubmitEmail} className="space-y-4">
            <div>
              <Label name="email">
                Correo electrónico
              </Label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
              />
            </div>
            <Button type="submit">Enviar código</Button>
          </form>
          </div>
        );
      case 2:
        return (
          <div className="text-center bg-white rounded-lg p-8 shadow-lg max-w-sm w-full">
          <form onSubmit={handleSubmitCode} className="space-y-4">
            <div>
              <Label name="code">
                Código de verificación
              </Label>
              <p className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias recusandae culpa ad adipisci optio ea accusamus earum porro?</p>
              <Input
                type="text"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ingresa el código recibido"
              />
            </div>
            <Button type="submit">Verificar código</Button>
          </form>
          </div>
        );
      case 3:
        return (
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm w-full">
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <Label name="newPassword">
                Nueva contraseña
              </Label>
              <Input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ingresa tu nueva contraseña"
              />
            </div>
            <div>
              <Label name="newPassword">
                Confirmar contraseña
              </Label>
              <Input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu nueva contraseña"
              />
            </div>
            <Button type="submit">Cambiar contraseña</Button>
          </form>
          </div>
        );
      case 4:
        return (
          <div className="text-center bg-white rounded-lg p-8 shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold text-[#043F61] mb-4">Cambio de contraseña exitoso</h2>
            <Button onClick={() => navigate('/')}>Volver al login</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-gray-300 mb-6 text-center">Recuperación de contraseña</h2>
      {renderStep()}
    </Layout>
  );
};


export default ForgotPassword;