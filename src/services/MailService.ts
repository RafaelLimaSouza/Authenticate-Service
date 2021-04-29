import * as nodemailer from 'nodemailer';

interface userDTO {
  name: string;
  userId: string;
  emailAddress: string;
  passwordCurrent: string;
  passwordOld: string;
  indexPassword: boolean;
  status: string;
}

class MailService {
  static async execute({
    name,
    userId,
    emailAddress,
    passwordCurrent,
  }: userDTO) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'lamont46@ethereal.email',
        pass: 'humcs4pQkfrZwRT9F5',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: 'lamont46@ethereal.email',
      to: emailAddress,
      subject: 'Cadastro para autenticação',
      text: ``,
      html: `<p>Hello, ${name}</p>
              <p>Seu cadastro foi criado com sucesso</p>
              <p> Seu login é ${userId} </p>
              <p> Sua senha inicial é ${passwordCurrent}.
              <p> Cadastre sua nova senha no primeiro acesso. </br>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        throw new Error(
          'Register included successfully but error in send Email',
        );
      } else {
        console.log('Email sent successfully');
      }
    });
  }
}

export default MailService;
