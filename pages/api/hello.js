// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  var message = req.body.test;
  var confirmation = {confimation: `Reception of '${message.toString()}' [confirmed] `}
  //res.send(req.body)
  res.status(200).json({ confirmation });
}
