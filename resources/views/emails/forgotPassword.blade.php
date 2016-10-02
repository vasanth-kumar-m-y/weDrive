<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:17px;line-height:24px;color:#373737;background:#f9f9f9">
    <tbody><tr>
        <td valign="top">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tbody><tr>
                    <td valign="bottom" style="padding:20px 16px 12px">
                        <div>
                            <a href="http://oceanstyxx.com/" target="_blank">
                                <img src="{{ asset('http://oceanstyxx.com/assets/img/logo.png') }}">
                            </a>
                        </div>
                    </td>
                </tr>
                </tbody></table>
        </td>
    </tr>
    <tr>
        <td valign="top">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
                <tbody><tr>
                    <td valign="top">
                        <div style="max-width:100%;margin:0 auto;padding:0 6px">
                            <div style="background:white;border-radius:0.5rem;padding:2rem;margin-bottom:1rem">
                                <p>Hi, {{$email}}</p>
                                <p>Reset Your Password</p>
                                <p>You requested to reset your password for your Vdrive App.</p>
                                <p>Click the link below to reset your password:</p>
                                <a href="<?php echo Config::get('app.vdrive_url'); ?>/reset_password/{{$Code}}">Click Here, To Reset Your Password</a>
                                <p>If you did not make this request, you can safely ignore this email. Rest assured your account is safe.</p>
                                <p>If clicking the link doesn't seem to work, you can copy and paste the link on your browser address window.</p>
                                <p>Questions? Contact Vdrive Support.</p>
                            </div>

                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    </tbody></table>
</body>
</html>