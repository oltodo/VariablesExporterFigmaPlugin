import { readFileSync } from 'node:fs'
import path from 'node:path'

import { fileURLToPath } from 'node:url'
import { expect, it } from 'vitest'
import { Transformer } from '../transformer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const dataPath = path.join(dirname, '../__fixtures__/data.json')
const data = JSON.parse(readFileSync(dataPath, 'utf-8')) as Plugin.Data

it('should transform with excludeHidden=false, resolveAliases=false', async () => {
  const transformer = new Transformer(data)

  expect(await transformer.transform()).toMatchInlineSnapshot(`
    {
      "collections": [
        {
          "defaultModeId": "RM:1",
          "hiddenFromPublishing": true,
          "id": "RC:1",
          "key": "07c7cc2cc16aaf561d65ea9695ba82dbfd47bc22",
          "modes": [
            {
              "id": "RM:1",
              "name": "A",
            },
            {
              "id": "RM:2",
              "name": "B",
            },
            {
              "id": "RM:3",
              "name": "C",
            },
            {
              "id": "RM:4",
              "name": "D",
            },
          ],
          "name": "Remote Collection",
          "variableIds": [
            "RV:1",
            "RV:2",
            "RV:3",
            "RV:4",
            "RV:5",
          ],
        },
        {
          "defaultModeId": "LM:1",
          "hiddenFromPublishing": false,
          "id": "LC:1",
          "key": "255fbb5a60c52d1f789f3abe758d9fd29ba1dbbe",
          "modes": [
            {
              "id": "LM:1",
              "name": "A",
            },
          ],
          "name": "Local Collection 1",
          "variableIds": [
            "LV:1",
            "LV:2",
            "LV:5",
            "LV:6",
          ],
        },
        {
          "defaultModeId": "LM:2",
          "hiddenFromPublishing": false,
          "id": "LC:2",
          "key": "23276c98c983de5afc33ee29cd6b83f7932d82c5",
          "modes": [
            {
              "id": "LM:2",
              "name": "B",
            },
            {
              "id": "LM:3",
              "name": "C",
            },
          ],
          "name": "Local Collection 2",
          "variableIds": [
            "LV:3",
            "LV:4",
          ],
        },
      ],
      "variables": [
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "RV:1",
          "key": "72d89ff30e1b3037b3f8c4a24fa606ad3f22b58b",
          "name": "Remote Variable 1",
          "remote": true,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "RM:1": {
              "id": "RV:2",
              "type": "VARIABLE_ALIAS",
            },
            "RM:2": {
              "id": "RV:3",
              "type": "VARIABLE_ALIAS",
            },
            "RM:3": {
              "id": "RV:4",
              "type": "VARIABLE_ALIAS",
            },
            "RM:4": {
              "id": "RV:5",
              "type": "VARIABLE_ALIAS",
            },
          },
          "variableCollectionId": "RC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "RV:2",
          "key": "050926de44ac1b8458abfad2242eb6a4eca5f26b",
          "name": "Remote Variable 2",
          "remote": true,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "RM:1": "RC:1:RV:2:RM:1",
            "RM:2": "RC:1:RV:2:RM:2",
            "RM:3": "RC:1:RV:2:RM:3",
            "RM:4": "RC:1:RV:2:RM:4",
          },
          "variableCollectionId": "RC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "RV:3",
          "key": "d61b7918e930bfc2a56ab4e4c45c8b4778666e5e",
          "name": "Remote Variable 3",
          "remote": true,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "RM:1": "RC:1:RV:3:RM:1",
            "RM:2": "RC:1:RV:3:RM:2",
            "RM:3": "RC:1:RV:3:RM:3",
            "RM:4": "RC:1:RV:3:RM:4",
          },
          "variableCollectionId": "RC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "RV:4",
          "key": "8dbb2e933fe5d95974bc356db6873458c40b4a43",
          "name": "Remote Variable 4",
          "remote": true,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "RM:1": "RC:1:RV:4:RM:1",
            "RM:2": "RC:1:RV:4:RM:2",
            "RM:3": "RC:1:RV:4:RM:3",
            "RM:4": "RC:1:RV:4:RM:4",
          },
          "variableCollectionId": "RC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "RV:5",
          "key": "31b13b09c43546b8c24ffe4e9ebdf4ca6bef60e6",
          "name": "Remote Variable 5",
          "remote": true,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "RM:1": "RC:1:RV:5:RM:1",
            "RM:2": "RC:1:RV:5:RM:2",
            "RM:3": "RC:1:RV:5:RM:3",
            "RM:4": "RC:1:RV:5:RM:4",
          },
          "variableCollectionId": "RC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "LV:1",
          "key": "bf9f05698a71576d1cf70ed6df33d6614e35d801",
          "name": "Local Variable 1",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:1": "LC:1:LV:1:LM:1",
          },
          "variableCollectionId": "LC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "LV:2",
          "key": "5c7994b19040d386472863e06149fe4286896056",
          "name": "Local Variable 2",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:1": "LC:1:LV:2:LM:1",
          },
          "variableCollectionId": "LC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "LV:5",
          "key": "4dfe5961a97d6189f22cbe46fe443714f6fc1b36",
          "name": "Local Variable 5",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:1": "LC:1:LV:5:LM:1",
          },
          "variableCollectionId": "LC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": false,
          "id": "LV:6",
          "key": "4dfe5961a97d6189f22cbe46fe443714f6fc1b36",
          "name": "Local Variable 6",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:1": {
              "id": "LV:4",
              "type": "VARIABLE_ALIAS",
            },
          },
          "variableCollectionId": "LC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": false,
          "id": "LV:3",
          "key": "25e5465c5dd67b7e586b7d1f802a13a8d9def63b",
          "name": "Local Variable 3",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:2": {
              "id": "LV:1",
              "type": "VARIABLE_ALIAS",
            },
            "LM:3": {
              "id": "LV:5",
              "type": "VARIABLE_ALIAS",
            },
          },
          "variableCollectionId": "LC:2",
        },
        {
          "description": "",
          "hiddenFromPublishing": false,
          "id": "LV:4",
          "key": "e979fbe2f55be620a5a6275332dbd9fe0bee1ea0",
          "name": "Local Variable 4",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:2": {
              "id": "RV:1",
              "type": "VARIABLE_ALIAS",
            },
            "LM:3": {
              "id": "RV:4",
              "type": "VARIABLE_ALIAS",
            },
          },
          "variableCollectionId": "LC:2",
        },
      ],
    }
  `)
})

it('should transform with excludeHidden=true, resolveAliases=false', async () => {
  const transformer = new Transformer(data, {
    excludeHidden: true,
    resolveAliases: false,
  })

  expect(await transformer.transform()).toMatchInlineSnapshot(`
    {
      "collections": [
        {
          "defaultModeId": "LM:1",
          "hiddenFromPublishing": false,
          "id": "LC:1",
          "key": "255fbb5a60c52d1f789f3abe758d9fd29ba1dbbe",
          "modes": [
            {
              "id": "LM:1",
              "name": "A",
            },
          ],
          "name": "Local Collection 1",
          "variableIds": [
            "LV:6",
          ],
        },
        {
          "defaultModeId": "LM:2",
          "hiddenFromPublishing": false,
          "id": "LC:2",
          "key": "23276c98c983de5afc33ee29cd6b83f7932d82c5",
          "modes": [
            {
              "id": "LM:2",
              "name": "B",
            },
            {
              "id": "LM:3",
              "name": "C",
            },
          ],
          "name": "Local Collection 2",
          "variableIds": [
            "LV:3",
            "LV:4",
          ],
        },
      ],
      "variables": [
        {
          "description": "",
          "hiddenFromPublishing": false,
          "id": "LV:6",
          "key": "4dfe5961a97d6189f22cbe46fe443714f6fc1b36",
          "name": "Local Variable 6",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:1": {
              "id": "LV:4",
              "type": "VARIABLE_ALIAS",
            },
          },
          "variableCollectionId": "LC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": false,
          "id": "LV:3",
          "key": "25e5465c5dd67b7e586b7d1f802a13a8d9def63b",
          "name": "Local Variable 3",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:2": "LC:1:LV:1:LM:1",
            "LM:3": "LC:1:LV:5:LM:1",
          },
          "variableCollectionId": "LC:2",
        },
        {
          "description": "",
          "hiddenFromPublishing": false,
          "id": "LV:4",
          "key": "e979fbe2f55be620a5a6275332dbd9fe0bee1ea0",
          "name": "Local Variable 4",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:2": "RC:1:RV:3:RM:2",
            "LM:3": "RC:1:RV:4:RM:3",
          },
          "variableCollectionId": "LC:2",
        },
      ],
    }
  `)
})

it('should transform with excludeHidden=false, resolveAliases=true', async () => {
  const transformer = new Transformer(data, {
    excludeHidden: false,
    resolveAliases: true,
  })

  expect(await transformer.transform()).toMatchInlineSnapshot(`
    {
      "collections": [
        {
          "defaultModeId": "RM:1",
          "hiddenFromPublishing": true,
          "id": "RC:1",
          "key": "07c7cc2cc16aaf561d65ea9695ba82dbfd47bc22",
          "modes": [
            {
              "id": "RM:1",
              "name": "A",
            },
            {
              "id": "RM:2",
              "name": "B",
            },
            {
              "id": "RM:3",
              "name": "C",
            },
            {
              "id": "RM:4",
              "name": "D",
            },
          ],
          "name": "Remote Collection",
          "variableIds": [
            "RV:1",
            "RV:2",
            "RV:3",
            "RV:4",
            "RV:5",
          ],
        },
        {
          "defaultModeId": "LM:1",
          "hiddenFromPublishing": false,
          "id": "LC:1",
          "key": "255fbb5a60c52d1f789f3abe758d9fd29ba1dbbe",
          "modes": [
            {
              "id": "LM:1",
              "name": "A",
            },
          ],
          "name": "Local Collection 1",
          "variableIds": [
            "LV:1",
            "LV:2",
            "LV:5",
            "LV:6",
          ],
        },
        {
          "defaultModeId": "LM:2",
          "hiddenFromPublishing": false,
          "id": "LC:2",
          "key": "23276c98c983de5afc33ee29cd6b83f7932d82c5",
          "modes": [
            {
              "id": "LM:2",
              "name": "B",
            },
            {
              "id": "LM:3",
              "name": "C",
            },
          ],
          "name": "Local Collection 2",
          "variableIds": [
            "LV:3",
            "LV:4",
          ],
        },
      ],
      "variables": [
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "RV:1",
          "key": "72d89ff30e1b3037b3f8c4a24fa606ad3f22b58b",
          "name": "Remote Variable 1",
          "remote": true,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "RM:1": "RC:1:RV:2:RM:1",
            "RM:2": "RC:1:RV:3:RM:2",
            "RM:3": "RC:1:RV:4:RM:3",
            "RM:4": "RC:1:RV:5:RM:4",
          },
          "variableCollectionId": "RC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "RV:2",
          "key": "050926de44ac1b8458abfad2242eb6a4eca5f26b",
          "name": "Remote Variable 2",
          "remote": true,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "RM:1": "RC:1:RV:2:RM:1",
            "RM:2": "RC:1:RV:2:RM:2",
            "RM:3": "RC:1:RV:2:RM:3",
            "RM:4": "RC:1:RV:2:RM:4",
          },
          "variableCollectionId": "RC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "RV:3",
          "key": "d61b7918e930bfc2a56ab4e4c45c8b4778666e5e",
          "name": "Remote Variable 3",
          "remote": true,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "RM:1": "RC:1:RV:3:RM:1",
            "RM:2": "RC:1:RV:3:RM:2",
            "RM:3": "RC:1:RV:3:RM:3",
            "RM:4": "RC:1:RV:3:RM:4",
          },
          "variableCollectionId": "RC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "RV:4",
          "key": "8dbb2e933fe5d95974bc356db6873458c40b4a43",
          "name": "Remote Variable 4",
          "remote": true,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "RM:1": "RC:1:RV:4:RM:1",
            "RM:2": "RC:1:RV:4:RM:2",
            "RM:3": "RC:1:RV:4:RM:3",
            "RM:4": "RC:1:RV:4:RM:4",
          },
          "variableCollectionId": "RC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "RV:5",
          "key": "31b13b09c43546b8c24ffe4e9ebdf4ca6bef60e6",
          "name": "Remote Variable 5",
          "remote": true,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "RM:1": "RC:1:RV:5:RM:1",
            "RM:2": "RC:1:RV:5:RM:2",
            "RM:3": "RC:1:RV:5:RM:3",
            "RM:4": "RC:1:RV:5:RM:4",
          },
          "variableCollectionId": "RC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "LV:1",
          "key": "bf9f05698a71576d1cf70ed6df33d6614e35d801",
          "name": "Local Variable 1",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:1": "LC:1:LV:1:LM:1",
          },
          "variableCollectionId": "LC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "LV:2",
          "key": "5c7994b19040d386472863e06149fe4286896056",
          "name": "Local Variable 2",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:1": "LC:1:LV:2:LM:1",
          },
          "variableCollectionId": "LC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": true,
          "id": "LV:5",
          "key": "4dfe5961a97d6189f22cbe46fe443714f6fc1b36",
          "name": "Local Variable 5",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:1": "LC:1:LV:5:LM:1",
          },
          "variableCollectionId": "LC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": false,
          "id": "LV:6",
          "key": "4dfe5961a97d6189f22cbe46fe443714f6fc1b36",
          "name": "Local Variable 6",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:1": "RC:1:RV:2:RM:1",
          },
          "variableCollectionId": "LC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": false,
          "id": "LV:3",
          "key": "25e5465c5dd67b7e586b7d1f802a13a8d9def63b",
          "name": "Local Variable 3",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:2": "LC:1:LV:1:LM:1",
            "LM:3": "LC:1:LV:5:LM:1",
          },
          "variableCollectionId": "LC:2",
        },
        {
          "description": "",
          "hiddenFromPublishing": false,
          "id": "LV:4",
          "key": "e979fbe2f55be620a5a6275332dbd9fe0bee1ea0",
          "name": "Local Variable 4",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:2": "RC:1:RV:3:RM:2",
            "LM:3": "RC:1:RV:4:RM:3",
          },
          "variableCollectionId": "LC:2",
        },
      ],
    }
  `)
})

it('should transform with excludeHidden=true, resolveAliases=true', async () => {
  const transformer = new Transformer(data, {
    excludeHidden: true,
    resolveAliases: true,
  })

  expect(await transformer.transform()).toMatchInlineSnapshot(`
    {
      "collections": [
        {
          "defaultModeId": "LM:1",
          "hiddenFromPublishing": false,
          "id": "LC:1",
          "key": "255fbb5a60c52d1f789f3abe758d9fd29ba1dbbe",
          "modes": [
            {
              "id": "LM:1",
              "name": "A",
            },
          ],
          "name": "Local Collection 1",
          "variableIds": [
            "LV:6",
          ],
        },
        {
          "defaultModeId": "LM:2",
          "hiddenFromPublishing": false,
          "id": "LC:2",
          "key": "23276c98c983de5afc33ee29cd6b83f7932d82c5",
          "modes": [
            {
              "id": "LM:2",
              "name": "B",
            },
            {
              "id": "LM:3",
              "name": "C",
            },
          ],
          "name": "Local Collection 2",
          "variableIds": [
            "LV:3",
            "LV:4",
          ],
        },
      ],
      "variables": [
        {
          "description": "",
          "hiddenFromPublishing": false,
          "id": "LV:6",
          "key": "4dfe5961a97d6189f22cbe46fe443714f6fc1b36",
          "name": "Local Variable 6",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:1": "RC:1:RV:2:RM:1",
          },
          "variableCollectionId": "LC:1",
        },
        {
          "description": "",
          "hiddenFromPublishing": false,
          "id": "LV:3",
          "key": "25e5465c5dd67b7e586b7d1f802a13a8d9def63b",
          "name": "Local Variable 3",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:2": "LC:1:LV:1:LM:1",
            "LM:3": "LC:1:LV:5:LM:1",
          },
          "variableCollectionId": "LC:2",
        },
        {
          "description": "",
          "hiddenFromPublishing": false,
          "id": "LV:4",
          "key": "e979fbe2f55be620a5a6275332dbd9fe0bee1ea0",
          "name": "Local Variable 4",
          "remote": false,
          "scopes": [
            "ALL_SCOPES",
          ],
          "type": "COLOR",
          "valuesByMode": {
            "LM:2": "RC:1:RV:3:RM:2",
            "LM:3": "RC:1:RV:4:RM:3",
          },
          "variableCollectionId": "LC:2",
        },
      ],
    }
  `)
})
