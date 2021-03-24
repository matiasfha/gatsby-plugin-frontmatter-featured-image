const {
  createRemoteFileNode,
} = require('gatsby-source-filesystem')


exports.onPreInit = () => {
  console.log('Generating image nodes from featured image')
}

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    image: Joi.string()
      .default('featuredImage')
      .required()
      .description(`Define what will be the featured image key inside the frontmatter.`),
  })
}

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}, pluginOptions) => {
  const { createNode } = actions
  const { image } = pluginOptions
  
  createResolvers({
    Mdx: {
      [image]: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.frontmatter[image],
            parentNodeId: source.id,
            cache,
            createNode,
            createNodeId,
            reporter,
          })

        }
      },
    },
    MarkdownRemark: {
      [image]: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.frontmatter[image],
            parentNodeId: source.id,
            cache,
            createNode,
            createNodeId,
            reporter,
          })

        }
      },
    },
  })
}
