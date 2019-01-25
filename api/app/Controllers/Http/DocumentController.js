'use strict'

const Document = use('App/Models/Document')

class DocumentController {
  async index ({ response }) {
    const documents = await Document.all()

    return response.json({
      success: true,
      data: documents
    })
  }

  async show ({ params, response }) {
    const document = await Document.find(params.id)

    if (!document) {
      return response.status(404).json({
        success: false,
        message: 'Resource not found'
      })
    }

    return response.json({
      success: true,
      data: document
    })
  }

  async store ({ request, response }) {
    const documentInfo = request.only(['title', 'content'])

    const document = new Document()
    document.title = documentInfo.title
    document.content = documentInfo.content

    await document.save()

    return response.status(201).json({
      success: true,
      data: document
    })
  }

  async update ({ params, request, response }) {
    const documentInfo = request.only(['title', 'content'])

    const document = await Document.find(params.id)
    
    if (!document) {
      return response.status(404).json({
        success: false,
        message: 'Resource not found'
      })
    }
    document.title = documentInfo.title
    document.content = documentInfo.content

    await document.save()

    return response.status(200).json({
      success: true,
      data: document
    })
  }

  async delete ({ params, response }) {
    const document = await Document.find(params.id)
    if (!document) {
      return response.status(404).json({
        success: false,
        message: 'Resource not found'
      })
    }

    await document.delete()
    
    return response.status(200).json({
      success: true,
      message: 'Resource deleted successfully'
    })
  }
}

module.exports = DocumentController
