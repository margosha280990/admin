<?php

class RostelecomATC{

	private $url = 'https://api.cloudpbx.rt.ru';
	private $url_test = 'https://api-test.cloudpbx.rt.ru/';
	private $client_id = '';
	private $client_sign = '';

	private $curl = null;

	public function __construct()
	{
		$this->curl = curl_init();
		curl_setopt ($this->curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($this->curl, CURLOPT_SSL_VERIFYPEER, 1);
	}

	public function __destrunct()
	{
		curl_close($this->curl);
		die();
	}

	public function query($command, $params = array (), $test = false)
	{

		$json = json_encode($params);
		$hash = hash('sha256', $this->client_id . $json . $this->client_sign);

		if($test == false)
		{
			curl_setopt($this->curl, CURLOPT_URL, $this->url . '/' . $command);
		}
		else
		{
			curl_setopt($this->curl, CURLOPT_URL, $this->url_test . '/' . $command);
		}

		curl_setopt($this->curl, CURLOPT_HTTPHEADER, array(
				'Content-Type: application/json',
				'X-Client-ID: ' . $this->client_id,
				'X-Client-Sign: ' . $hash)
		);

		curl_setopt($this->curl, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt ($this->curl, CURLOPT_POSTFIELDS, $json);

		$content = curl_exec($this->curl);

		return $content;
	}

	public function get_audio($url){
		$hash = hash('sha256', $this->client_id . $this->client_sign);

		curl_setopt($this->curl, CURLOPT_URL, $url);
		curl_setopt($this->curl, CURLOPT_HTTPHEADER, array(
				'Content-Type: application/json',
				'X-Client-ID: ' . $this->client_id,
				'X-Client-Sign: ' . $hash)
		);

		$content = curl_exec($this->curl);

		return $content;
	}
}
