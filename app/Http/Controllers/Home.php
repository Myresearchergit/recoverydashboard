<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Home extends Controller
{
    protected $siteUrl;

    public function __construct()
    {
        $this->siteUrl = 'https://dpdata.myresearcher.com/api/recovery';
    }

    public function index()
    {
        return view('home');
    }

    public function getdata(Request $request)
    {
        // ✅ Get POST data (Laravel way)
        $postdata = $request->all();

        $siteUrl = $this->siteUrl.'/'.($postdata['urls'] ?? '');

        if (! empty($postdata['urls'])) {

            $postDatas = http_build_query($postdata);

            $headers = array(
			'Accept: application/json',
			'Authorization: Bearer 3XT49nRtgertygetHYDFDUYuN2zPSwMEAOq9X34jckRKSbqLWEwKAFtcDBOB'
			);

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $siteUrl);
            curl_setopt($ch, CURLOPT_ENCODING, '');
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_USERPWD, 'portaluser:nTryIt!');
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postDatas);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 120);
            curl_setopt($ch, CURLOPT_TIMEOUT, 120);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

            $content = curl_exec($ch);

            if ($content === false) {
                $content = json_encode([
                    'error' => 1,
                    'message' => curl_error($ch),
                ]);
            }

            curl_close($ch);

        } else {
            $content = json_encode([
                'error' => 1,
                'message' => 'Url Error',
            ]);
        }

        // ✅ Laravel response
        return response($content)->header('Content-Type', 'application/json');
    }
}
