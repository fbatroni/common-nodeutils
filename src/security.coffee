generateToken = (options) ->
  now = moment()
  payload =
    user: req.user
    iat: now.unix()
    exp: options.expiration ? options.expiration ? now.add(6, 'hour').unix()
    sub: req.user.email

  system_claims =
    algorithms: options.algorithm || [ 'HS256' ]
    audience: options.audience
    issuer: options.issuer

  return jwt.sign(payload, options.secret, system_claims )


module.export =
  jwt:
    generateToken: generateToken