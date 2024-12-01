export type TimeCapsule = {
  "version": "0.1.0",
  "name": "time_capsule",
  "instructions": [
    {
      "name": "createCapsule",
      "accounts": [
        {
          "name": "capsule",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "recipient",
          "type": "publicKey"
        },
        {
          "name": "releaseTime",
          "type": "i64"
        },
        {
          "name": "encryptedAesKey",
          "type": "string"
        },
        {
          "name": "videoCid",
          "type": "string"
        }
      ]
    },
    {
      "name": "accessCapsule",
      "accounts": [
        {
          "name": "capsule",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "requestor",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "getCapsulesForWallet",
      "accounts": [
        {
          "name": "wallet",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "capsule",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "recipient",
            "type": "publicKey"
          },
          {
            "name": "releaseTime",
            "type": "i64"
          },
          {
            "name": "encryptedAesKey",
            "type": "string"
          },
          {
            "name": "videoCid",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "accessed",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to access this capsule."
    },
    {
      "code": 6001,
      "name": "TooEarly",
      "msg": "It is too early to access this capsule."
    }
  ]
};

export const IDL: TimeCapsule = {
  "version": "0.1.0",
  "name": "time_capsule",
  "instructions": [
    {
      "name": "createCapsule",
      "accounts": [
        {
          "name": "capsule",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "recipient",
          "type": "publicKey"
        },
        {
          "name": "releaseTime",
          "type": "i64"
        },
        {
          "name": "encryptedAesKey",
          "type": "string"
        },
        {
          "name": "videoCid",
          "type": "string"
        }
      ]
    },
    {
      "name": "accessCapsule",
      "accounts": [
        {
          "name": "capsule",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "requestor",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "getCapsulesForWallet",
      "accounts": [
        {
          "name": "wallet",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "capsule",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "recipient",
            "type": "publicKey"
          },
          {
            "name": "releaseTime",
            "type": "i64"
          },
          {
            "name": "encryptedAesKey",
            "type": "string"
          },
          {
            "name": "videoCid",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "accessed",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to access this capsule."
    },
    {
      "code": 6001,
      "name": "TooEarly",
      "msg": "It is too early to access this capsule."
    }
  ]
}; 