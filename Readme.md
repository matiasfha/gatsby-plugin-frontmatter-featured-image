# What this plugin do?
This plugin will retrieve an image url defined as part of the frontmatter of a MDX or MarkdownRemark
file and create a file node to be used with `gatsby-plugin-image` or `gatsby-image`

# How to install
Just install as any other gatsby plugin! 

`$ npm install gatsby-plugin-frontmatter-featured-image`

or 

`$ yarn add gatsby-plugin-frontmatter-featured-image`

then add this to your `gatsby-config.js` file as a plugin
```
{
  resolve: `gatsby-plugin-frontmatter-featured-image,
  options: {
    image: 'featuredImage'
    }
}
```

# How to configure the plugin

This plugin have only one configuration option, that is the `image` property. This property is used
to let the plugin know what frontmatter attribute is used to store the image url

# How to query?
This plugin will create a new "entry"  when you are querying for your mdx data that will be named the same as the `image` property of the configuration, in this case `featuredImage`.

```
query MyQuery {
  allMdx {
    nodes {
      featuredImage {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
}
```


# How it works?

It works by using the `createResolvers` gatsby api to create a new resolver on `Mdx`  or
`MarkdownRemark` files. On each node will create a new file node by using `createRemoteFileNode` from `gatsby-source-filesystem` this enable you to directly query and get `gatsbyImageData`.

## Rationale
This was created out of the need of create nodes that are queryable to be used with  `gatsby-plugin-image` when using the filesystem route api.
With filesystem route api you have access to the `body` of the mdx file and also the frontmatter, but if you use an external image in `frontmatter` you cannot used as a dynamic image with `gatsby-plugin-image`
This plugin solve that by created the required nodes.


