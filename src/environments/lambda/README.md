<p align="center">
  <img alt="GitHub branch checks state" src="https://img.shields.io/github/checks-status/flexion/msab-arts-locator/main">
  <a href="https://deepscan.io/dashboard#view=project&tid=8969&pid=17228&bid=388480"><img src="https://deepscan.io/api/teams/8969/projects/17228/branches/388480/badge/grade.svg" alt="DeepScan grade"></a>
  <img alt="Libraries.io dependency status for GitHub repo" src="https://img.shields.io/librariesio/github/flexion/msab-arts-locator">
</p>

```
APIKEY={apiKey here} DOMAIN_NAME=msab.flexion.us CERTIFICATE_ID={certidhere} yarn sls invoke local --function saveLocation --stage pre --force --verbose --data '{"artistName":"meow","locationName":"meow","category":{"folk":false,"visual":false,"literary":false,"music":false,"craft":false,"photo":false,"opera":false,"dance":false},"website":"meow","street":"meow","city":"asdf","state":"MN","zip":"12345","contactName":"asdf","contactEmail":"meow","contactPhone":"1231231231","description":"asdfasdf","createdAt":1559842421859,"enitityId":"1fd2c490-a26a-4985-868b-f31cb92be784"}'
```