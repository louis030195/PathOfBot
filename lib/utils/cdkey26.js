/* global System, D2NG */

const Bridge = require('bridge.net')
const crypto = require('crypto')

Bridge.assembly('Demo', function ($asm, globals) {
  'use strict'

  Bridge.define('D2NG.BNCS.Hashing.CdKey', {
    props: {
      Key: null,
      Product: 0,
      Public: null,
      Private: null,
      KeyLength: 0
    },
    ctors: {
      ctor: function (key) {
        this.$initialize()
        this.Key = key
      }
    }
  })

  Bridge.define('D2NG.BNCS.Hashing.CdKeySha1', {
    inherits: [D2NG.BNCS.Hashing.CdKey],
    statics: {
      fields: {
        Translate: null,
        KeyTable: null
      },
      ctors: {
        init: function () {
          this.Translate = System.Array.init([
            9,
            4,
            7,
            15,
            13,
            10,
            3,
            11,
            1,
            2,
            12,
            8,
            6,
            14,
            5,
            0,
            9,
            11,
            5,
            4,
            8,
            15,
            1,
            14,
            7,
            0,
            3,
            2,
            10,
            6,
            13,
            12,
            12,
            14,
            1,
            4,
            9,
            15,
            10,
            11,
            13,
            6,
            0,
            8,
            7,
            2,
            5,
            3,
            11,
            2,
            5,
            14,
            13,
            3,
            9,
            0,
            1,
            15,
            7,
            12,
            10,
            6,
            4,
            8,
            6,
            2,
            4,
            5,
            11,
            8,
            12,
            14,
            13,
            15,
            7,
            1,
            10,
            0,
            3,
            9,
            5,
            4,
            14,
            12,
            7,
            6,
            13,
            10,
            15,
            2,
            9,
            1,
            0,
            11,
            8,
            3,
            12,
            7,
            8,
            15,
            11,
            0,
            5,
            9,
            13,
            10,
            6,
            14,
            2,
            4,
            3,
            1,
            3,
            10,
            14,
            8,
            1,
            11,
            5,
            4,
            2,
            15,
            13,
            12,
            6,
            7,
            9,
            0,
            12,
            13,
            1,
            15,
            8,
            14,
            5,
            11,
            3,
            10,
            9,
            0,
            7,
            2,
            4,
            6,
            13,
            10,
            7,
            14,
            1,
            6,
            11,
            8,
            15,
            12,
            5,
            2,
            3,
            0,
            4,
            9,
            3,
            14,
            7,
            5,
            11,
            15,
            8,
            12,
            1,
            10,
            4,
            13,
            0,
            6,
            9,
            2,
            11,
            6,
            9,
            4,
            1,
            8,
            10,
            13,
            7,
            14,
            0,
            12,
            15,
            2,
            3,
            5,
            12,
            7,
            8,
            13,
            3,
            11,
            0,
            14,
            6,
            15,
            9,
            4,
            10,
            1,
            5,
            2,
            12,
            6,
            13,
            9,
            11,
            0,
            1,
            2,
            15,
            7,
            3,
            4,
            10,
            14,
            8,
            5,
            3,
            6,
            1,
            5,
            11,
            12,
            8,
            0,
            15,
            14,
            9,
            4,
            7,
            10,
            13,
            2,
            10,
            7,
            11,
            15,
            2,
            8,
            0,
            13,
            14,
            12,
            1,
            6,
            9,
            3,
            5,
            4,
            10,
            11,
            13,
            4,
            3,
            8,
            5,
            9,
            1,
            0,
            15,
            12,
            7,
            14,
            2,
            6,
            11,
            4,
            13,
            15,
            1,
            6,
            3,
            14,
            7,
            10,
            12,
            8,
            9,
            2,
            5,
            0,
            9,
            6,
            7,
            0,
            1,
            10,
            13,
            2,
            3,
            14,
            15,
            12,
            5,
            11,
            4,
            8,
            13,
            14,
            5,
            6,
            1,
            9,
            8,
            12,
            2,
            15,
            3,
            7,
            11,
            4,
            0,
            10,
            9,
            15,
            4,
            0,
            1,
            6,
            10,
            14,
            2,
            3,
            7,
            13,
            5,
            11,
            8,
            12,
            3,
            14,
            1,
            10,
            2,
            12,
            8,
            4,
            11,
            7,
            13,
            0,
            15,
            6,
            9,
            5,
            7,
            2,
            12,
            6,
            10,
            8,
            11,
            0,
            15,
            4,
            3,
            14,
            9,
            1,
            13,
            5,
            12,
            4,
            5,
            9,
            10,
            2,
            8,
            13,
            3,
            15,
            1,
            14,
            6,
            7,
            11,
            0,
            10,
            8,
            14,
            13,
            9,
            15,
            3,
            0,
            4,
            6,
            1,
            12,
            7,
            11,
            2,
            5,
            3,
            12,
            4,
            10,
            2,
            15,
            13,
            14,
            7,
            0,
            5,
            8,
            1,
            6,
            11,
            9,
            10,
            12,
            1,
            0,
            9,
            14,
            13,
            11,
            3,
            7,
            15,
            8,
            5,
            2,
            4,
            6,
            14,
            10,
            1,
            8,
            7,
            6,
            5,
            12,
            2,
            15,
            0,
            13,
            3,
            11,
            4,
            9,
            3,
            8,
            14,
            0,
            7,
            9,
            15,
            12,
            1,
            6,
            13,
            2,
            5,
            10,
            11,
            4,
            3,
            10,
            12,
            4,
            13,
            11,
            9,
            14,
            15,
            6,
            1,
            7,
            2,
            0,
            5,
            8
          ], System.Byte)
          this.KeyTable = System.Array.init([
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            0,
            255,
            1,
            255,
            2,
            3,
            4,
            5,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            255,
            13,
            14,
            255,
            15,
            16,
            255,
            17,
            255,
            18,
            255,
            19,
            255,
            20,
            21,
            22,
            23,
            24,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            255,
            13,
            14,
            255,
            15,
            16,
            255,
            17,
            255,
            18,
            255,
            19,
            255,
            20,
            21,
            22,
            23,
            24,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255,
            255
          ], System.Byte)
        }
      },
      methods: {
        BuildTableFromKey: function (cdKey) {
          var table = System.Array.init(52, 0, System.Int32)

          var b = 33
          for (var i = 0; i < 26; i = (i + 1) | 0) {
            var a = (((b + 1973) | 0)) % 52
            b = (((a + 1973) | 0)) % 52

            var key = D2NG.BNCS.Hashing.CdKeySha1.KeyTable[System.Array.index(cdKey.charCodeAt(i), D2NG.BNCS.Hashing.CdKeySha1.KeyTable)]
            table[System.Array.index(a, table)] = (Bridge.Int.div(key, 5)) | 0
            table[System.Array.index(b, table)] = key % 5
          }

          return table
        },
        GenerateValues: function (table) {
          var values = System.Array.init(4, System.Int64(0), System.Int64)

          var rounds = 4
          var mulx = System.Int64(5)

          for (var i = 52; i > 0; i = (i - 1) | 0) {
            var posA = (rounds - 1) | 0
            var posB = posA
            var byt = System.Int64(table[System.Array.index(((i - 1) | 0), table)])

            for (var j = 0; j < rounds; j = (j + 1) | 0) {
              var p1 = values[System.Array.index(posA, values)].and(System.Int64([-1, 0]))
              posA = (posA - 1) | 0

              var p2 = mulx.and(System.Int64([-1, 0]))
              var edxeax = p1.mul(p2)

              values[System.Array.index(posB, values)] = System.Int64(System.Int64.clip32(byt) + System.Int64.clip32(edxeax))
              byt = edxeax.shr(32)
              posB = (posB - 1) | 0
            }
          }

          var var8 = 29
          for (var i1 = 464; i1 > -1; i1 = (i1 - 16) | 0) {
            var esi = (var8 & 7) << 2
            var var4 = var8 >> 3
            var varC = (values[System.Array.index(((3 - var4) | 0), values)].and((System.Int64(15).shl(esi)))).shr(esi)

            if (i1 < 464) {
              for (var j1 = 29; j1 > var8; j1 = (j1 - 1) | 0) {
                varC = D2NG.BNCS.Hashing.CdKeySha1.RecalcVarC(varC, values, i1, j1)
              }
            }

            var8 = (var8 - 1) | 0

            for (var j2 = var8; j2 > -1; j2 = (j2 - 1) | 0) {
              varC = D2NG.BNCS.Hashing.CdKeySha1.RecalcVarC(varC, values, i1, j2)
            }

            var index = (3 - var4) | 0
            var ebx = (System.Int64(D2NG.BNCS.Hashing.CdKeySha1.Translate[System.Array.index(System.Int64.toNumber(varC.add(System.Int64(i1))), D2NG.BNCS.Hashing.CdKeySha1.Translate)]).and(System.Int64(15))).shl(esi)
            values[System.Array.index(index, values)] = (ebx.or((System.Int64(15).shl(esi)).not().and(values[System.Array.index(index, values)])))
          }

          return System.Linq.Enumerable.from(values, System.Int64).select(function (v) {
            return System.Int64.clip32(v)
          }).ToArray(System.Int32)
        },
        RecalcVarC: function (varC, values, i, j) {
          var ecx = ((j & 7) << 2)
          var idx = D2NG.BNCS.Hashing.CdKeySha1.Idx(j)
          var ebp = D2NG.BNCS.Hashing.CdKeySha1.Ebp(values[System.Array.index(idx, values)], ecx)
          return System.Int64(D2NG.BNCS.Hashing.CdKeySha1.Translate[System.Array.index(System.Int64.toNumber(ebp.xor(System.Int64((((D2NG.BNCS.Hashing.CdKeySha1.Translate[System.Array.index(System.Int64.toNumber(varC.add(System.Int64(i))), D2NG.BNCS.Hashing.CdKeySha1.Translate)] + i) | 0))))), D2NG.BNCS.Hashing.CdKeySha1.Translate)])
        },
        Idx: function (j) {
          return ((3 - (j >> 3)) | 0)
        },
        Ebp: function (value, ecx) {
          return (value.and((System.Int64(15).shl(ecx)))).shr(ecx)
        }
      }
    },
    ctors: {
      ctor: function (key) {
        this.$initialize()
        D2NG.BNCS.Hashing.CdKey.ctor.call(this, key)
        this.KeyLength = key.length
        this.Decode()
      }
    },
    methods: {
      Decode: function () {
        var table = D2NG.BNCS.Hashing.CdKeySha1.BuildTableFromKey(this.Key)
        var values = D2NG.BNCS.Hashing.CdKeySha1.GenerateValues(table)

        var valuesAsBytes = System.Linq.Enumerable.from(values, System.Int32).selectMany(System.BitConverter.getBytes$4).ToArray(System.Byte)

        var esi = 0
        for (var edi = 0; edi < 120; edi = (edi + 1) & 255) {
          var eax = edi & 31
          var ecx = esi & 31
          var edx = (3 - (edi >> 5)) | 0

          var loc = (12 - ((esi >> 5) << 2)) | 0
          var ebp = System.BitConverter.toInt32(valuesAsBytes, loc)
          ebp = (ebp & (1 << ecx)) >> ecx

          values[System.Array.index(edx, values)] = ((ebp & 1) << eax) | (~(1 << eax) & values[System.Array.index(edx, values)])

          esi = (esi + 11) | 0
          if (esi > 120) {
            esi = (esi - 120) | 0
          }
        }

        this.Product = values[System.Array.index(0, values)] >> 10
        this.Public = System.BitConverter.getBytes$4(((values[System.Array.index(0, values)] & 1023) << 16) | (((((values[System.Array.index(1, values)]) >>> 0) >>> 16)) | 0))

        var priv = new (System.Collections.Generic.List$1(System.Byte)).ctor()
        priv.add((((values[System.Array.index(1, values)] & 255) >> 0) & 255))
        priv.add((((values[System.Array.index(1, values)] & 65280) >> 8) & 255))
        priv.AddRange(System.BitConverter.getBytes$4(values[System.Array.index(2, values)]))
        priv.AddRange(System.BitConverter.getBytes$4(values[System.Array.index(3, values)]))
        this.Private = priv.ToArray()
      },
      ComputeHash: function (clientToken, serverToken) {
        var buffer = new (System.Collections.Generic.List$1(System.Byte)).ctor()
        buffer.AddRange(System.BitConverter.getBytes$8(clientToken))
        buffer.AddRange(System.BitConverter.getBytes$8(serverToken))
        buffer.AddRange(System.BitConverter.getBytes$4(this.Product))
        buffer.AddRange(this.Public)
        buffer.AddRange(this.Private)
        const shasum = crypto.createHash('sha1')
        shasum.update(Buffer.from(buffer.ToArray()))
        return shasum.digest()
      }
    }
  })
})

function cdKey (cdkey, clientToken, serverToken) {
  let result
  Bridge.assembly('Demo', function ($asm, globals) {
    'use strict'
    Bridge.init(function () {
      var key = new D2NG.BNCS.Hashing.CdKeySha1(cdkey)

      result = {
        output: Buffer.from(key.ComputeHash(clientToken, serverToken)),
        publicValue: Buffer.from(key.Public)
      }
    })
  })
  return result
}

module.exports = cdKey
