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
                            <a href="http://pubdrivers.com/" target="_blank">
                                <img src="{{ asset('assets/img/pubdrive_logo.png') }}">
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
                                <p>Hi, {{$details->customer->name}}</p>
                                <p>your billing invoice for the ride from {{$details->pub->pub_name}}.</p>
                                <p>your total travel time <b>{{$details->total_travel_time}} Minutes</b></p>
                                <p>your total travel price <b>Rs. {{$details->total_drive_rate}}</b></p>
                                <h4>Bill BreakUp is as follows</h4>
                                <table border="1" cellpadding="5" cellspacing="5">
                                  <tr>
                                    <th>Breakup</th>
                                    <th>Qty</th>
                                    <th>unit price</th>
                                    <th>total</th>
                                  </tr>
                                  @foreach($details->billing as $key => $value)
                                  <tr>
                                    <td>{{$value->price_breakup}}</td>
                                    <td>{{$value->quantity}}</td>
                                    <td>{{$value->unit_price}}</td>
                                    <td>{{$value->total_price}}</td>
                                  </tr>
                                  @endforeach
                                </table>
                                <p>Questions? <a href="http://pubdrivers.com/#/contactus" target="_blank"> Contact Pubdrivers Support.</a></p>
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