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
                                <p>Your New Password</p>
                                <p>You requested forgot password for your Vdrive App.</p>
                                <p>Your New Password:</p>
                                <p><b>{{$Code}}</b></p>
                                <p>If you did not make this request, you can safely ignore this email. Rest assured your account is safe.</p>
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