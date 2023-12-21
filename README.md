# Frontend of the Intigram Web Interface

This is the React front-end for the Intigram web app. In order to quickly run it locally, simply make sure you have docker installed and have started the backend as well, then run the following commands:

<pre>
cd FrontWebInterface    
export REACT_APP_API_KEY=<span style='background:yellow'>{Riot API key}</span>
chmod +x local_run.sh
./local_run.sh
</pre>

And you should be able to see the Intigram web app on <a href="http://localhost:8000">http://localhost:8000</a>.

You can always get a development Riot API key from <a href="https://developer.riotgames.com">https://developer.riotgames.com</a>.