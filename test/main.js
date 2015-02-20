// Generated by CoffeeScript 1.7.1
(function() {
  var Client, assert, nodemailer;

  Client = (require('../lib/yapople')).Client;

  assert = require('assert');

  nodemailer = require('nodemailer');

  describe('POP3 client tests', function() {
    var count, options, tlsOptions;
    this.timeout(120000);
    count = 0;
    before(function(done) {
      var mailOptions, transporter;
      transporter = nodemailer.createTransport({
        service: 'Mail.ru',
        auth: {
          user: 'yapople@mail.ru',
          pass: 'yapopleyapopleyapopleyapople'
        }
      });
      mailOptions = {
        from: 'yapople@mail.ru',
        to: 'yapople@mail.ru',
        subject: 'msg 0 сообщение',
        text: 'msg 0 сообщение',
        html: '<b>Hello world ✔ Дорждынька</b>'
      };
      return transporter.sendMail(mailOptions, function(error) {
        if (error) {
          return console.log(error);
        } else {
          mailOptions.subject = 'msg 1 сообщение';
          mailOptions.text = 'msg 1 сообщение';
          return transporter.sendMail(mailOptions, function(error) {
            if (error) {
              return console.log(error);
            } else {
              mailOptions.subject = 'msg 2 сообщение';
              mailOptions.text = 'msg 2 сообщение';
              return transporter.sendMail(mailOptions, function(error) {
                if (error) {
                  return console.log(error);
                } else {
                  mailOptions.subject = 'msg 3 сообщение';
                  mailOptions.text = 'msg 3 сообщение';
                  return transporter.sendMail(mailOptions, function(error) {
                    if (error) {
                      return console.log(error);
                    } else {
                      return done();
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
    options = {
      hostname: 'pop.mail.ru',
      port: 110,
      username: 'yapople',
      password: 'yapopleyapopleyapopleyapople'
    };
    tlsOptions = {
      hostname: 'pop.mail.ru',
      port: 995,
      tls: true,
      username: 'yapople',
      password: 'yapopleyapopleyapopleyapople'
    };
    describe('connect', function() {
      it('should connect to the existing server', function(done) {
        var client;
        client = new Client(options);
        return client.connect(function(err) {
          assert.equal(err, null);
          return client.disconnect(done);
        });
      });
      it('should not login to TLS server without tls option', function(done) {
        var client;
        client = new Client(options);
        return client.connect(function(err, data) {
          assert.equal(err, null);
          return client.login(function(err, data) {
            assert.notEqual(err, null);
            assert.equal(err, 'POP3 is available only with SSL or TLS connection enabled');
            return done();
          });
        });
      });
      return it('should login to TLS server with tls option', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          assert.equal(err, null);
          return client.login(function(err, data) {
            assert.equal(err, null);
            assert.equal(data, 'Welcome!');
            return client.disconnect(done);
          });
        });
      });
    });
    describe('stat command', function() {
      return it('returns message stat count', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          assert.equal(err, null);
          return client.login(function(err, data) {
            assert.equal(err, null);
            return client.stat(function(err, data) {
              assert.equal(err, null);
              return client.disconnect(done);
            });
          });
        });
      });
    });
    describe('list command', function() {
      it('returns message list count', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          assert.equal(err, null);
          return client.login(function(err, data) {
            assert.equal(err, null);
            return client.list(function(err, data) {
              assert.equal(err, null);
              client.disconnect;
              return done();
            });
          });
        });
      });
      return it('returns info about message', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          assert.equal(err, null);
          return client.login(function(err, data) {
            assert.equal(err, null);
            return client.list(1, function(err, data) {
              assert.equal(err, null);
              client.disconnect();
              return done();
            });
          });
        });
      });
    });
    describe('retr command', function() {
      it('should return message body for known message', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          return client.login(function(err, data) {
            return client.retr(1, function(err, data) {
              assert.equal(err, null);
              return client.disconnect(done);
            });
          });
        });
      });
      return it('should return an error for unknown message', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          return client.login(function(err, data) {
            return client.retr(666, function(err, data) {
              assert.notEqual(err, null);
              return client.disconnect(done);
            });
          });
        });
      });
    });
    describe('retr command', function() {
      return it('should return parsed message when using mailparser', function(done) {
        var client;
        tlsOptions.mailparser = true;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          return client.login(function(err, data) {
            return client.retr(1, function(err, data) {
              assert.equal(err, null);
              assert.ok(data.text);
              if (!data.subject) {
                console.log(data);
              }
              assert.ok(data.subject);
              assert.ok(data.headers);
              return client.disconnect(done);
            });
          });
        });
      });
    });
    describe('count command', function() {
      return it('should return message count', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          return client.login(function(err, data) {
            return client.count(function(err, data) {
              assert.equal(err, null);
              assert.ok(data >= 0);
              count = data;
              return client.disconnect(done);
            });
          });
        });
      });
    });
    describe('dele command', function() {
      it('should mark last message as deleted', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          return client.login(function(err, data) {
            return client.dele(count, function(err, data) {
              assert.equal(err, null);
              return client.quit(done);
            });
          });
        });
      });
      return it('should be deleted after the end of transaction', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          assert.equal(err, null);
          return client.login(function(err, data) {
            assert.equal(err, null);
            return client.count(function(err, data) {
              assert.equal(err, null);
              assert.equal(data, count - 1);
              count = data;
              return client.disconnect(done);
            });
          });
        });
      });
    });
    describe('rset command', function() {
      it('should mark last message as deleted, then reset', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          return client.login(function(err, data) {
            return client.dele(count, function(err, data) {
              assert.equal(err, null);
              return client.rset(function(err, data) {
                assert.equal(err, null);
                return client.quit(done);
              });
            });
          });
        });
      });
      return it('should not be deleted after the end of transaction', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          assert.equal(err, null);
          return client.login(function(err, data) {
            assert.equal(err, null);
            return client.count(function(err, data) {
              assert.equal(err, null);
              assert.equal(data, count);
              return client.disconnect(done);
            });
          });
        });
      });
    });
    describe('connect', function() {
      return it('should properly connect after disconnection', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err) {
          assert.equal(err, null);
          return client.disconnect(function(err) {
            assert.equal(err, null);
            return client.connect(function(err) {
              assert.equal(err, null);
              return client.disconnect(function(err) {
                assert.equal(err, null);
                return done();
              });
            });
          });
        });
      });
    });
    describe('retrieve', function() {
      it('should properly works on array of message numbers', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          return client.login(function(err, data) {
            return client.retrieve([count, count - 1, count - 2], function(err, data) {
              assert.equal(err, null);
              assert.ok(Array.isArray(data));
              assert.equal(data.length, 3);
              return client.disconnect(done);
            });
          });
        });
      });
      return it('should return an error with bad arguments', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          return client.login(function(err, data) {
            return client.retrieve([count, count + 1, count + 2], function(err, data) {
              assert.notEqual(err, null);
              return client.disconnect(done);
            });
          });
        });
      });
    });
    describe('delete', function() {
      it('should properly delete an array of messages', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          return client.login(function(err, data) {
            return client["delete"]([count, count - 1, count - 2], function(err, data) {
              assert.equal(err, null);
              assert.ok(Array.isArray(data));
              assert.equal(data.length, 3);
              data.forEach(function(msg) {
                return assert.ok(/^message (\d)* deleted$/.test(msg));
              });
              return client.rset(function(err, data) {
                assert.equal(err, null);
                return client.disconnect(done);
              });
            });
          });
        });
      });
      return it('should return an error with bad arguments and make a rset after all', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          return client.login(function(err, data) {
            return client["delete"]([count, count + 1, count + 2], function(err, data) {
              assert.notEqual(err, null);
              return client.disconnect(function() {
                return client.connect(function() {
                  return client.login(function() {
                    return client.count(function(err, cou) {
                      assert.equal(cou, count);
                      return client.disconnect(done);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
    describe('retrieveAll', function() {
      return it('should return all messages', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          return client.login(function(err, data) {
            return client.retrieveAll(function(err, data) {
              assert.equal(err, null);
              assert.ok(Array.isArray(data));
              assert.equal(data.length, count);
              return client.disconnect(done);
            });
          });
        });
      });
    });
    describe('deleteAll', function() {
      return it('should delete all messages', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          return client.login(function(err, data) {
            return client.deleteAll(function(err, data) {
              assert.equal(err, null);
              assert.ok(Array.isArray(data));
              assert.equal(data.length, count);
              return client.rset(function() {
                return client.disconnect(done);
              });
            });
          });
        });
      });
    });
    return describe('retrieveAndDeleteAll', function() {
      return it('should return all messages and delete them', function(done) {
        var client;
        client = new Client(tlsOptions);
        return client.connect(function(err, data) {
          return client.login(function(err, data) {
            return client.retrieveAndDeleteAll(function(err, data) {
              assert.equal(err, null);
              assert.ok(Array.isArray(data));
              assert.equal(data.length, count);
              return client.disconnect(function() {
                return client.connect(function() {
                  return client.login(function() {
                    return client.count(function(err, count) {
                      assert.equal(err, null);
                      assert.equal(count, 0);
                      return client.disconnect(done);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=main.map
