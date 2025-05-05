import { z } from 'zod'

export const VolumeSchema = z.object({
  kind: z.string().nullish(),
  id: z.string(),
  etag: z.string().nullish(),
  selfLink: z.string().nullish(),
  volumeInfo: z.object({
    title: z.string().nullish(),
    subtitle: z.string().nullish(),
    authors: z.array(z.string().nullish()).nullish(),
    publisher: z.string().nullish(),
    publishedDate: z.string().nullish(),
    description: z.string().nullish(),
    industryIdentifiers: z
      .array(
        z
          .object({
            type: z.string().nullish(),
            identifier: z.string().nullish(),
          })
          .nullish(),
      )
      .nullish(),
    pageCount: z.number().nullish(),
    dimensions: z
      .object({
        height: z.string().nullish(),
        width: z.string().nullish(),
        thickness: z.string().nullish(),
      })
      .nullish(),
    printType: z.string().nullish(),
    mainCategory: z.string().nullish(),
    categories: z.array(z.string().nullish()).nullish(),
    averageRating: z.number().nullish(),
    ratingsCount: z.number().nullish(),
    contentVersion: z.string().nullish(),
    imageLinks: z
      .object({
        smallThumbnail: z.string().nullish(),
        thumbnail: z.string().nullish(),
        small: z.string().nullish(),
        medium: z.string().nullish(),
        large: z.string().nullish(),
        extraLarge: z.string().nullish(),
      })
      .nullish(),
    language: z.string().nullish(),
    previewLink: z.string().nullish(),
    infoLink: z.string().nullish(),
    canonicalVolumeLink: z.string().nullish(),
  }),

  userInfo: z
    .object({
      review: z.unknown().nullish(),
      readingPosition: z.unknown().nullish(),
      isPurchased: z.boolean().nullish(),
      isPreordered: z.boolean().nullish(),
      updated: z.string().nullish(),
    })
    .nullish(),

  saleInfo: z
    .object({
      country: z.string().nullish(),
      saleability: z.string().nullish(),
      onSaleDate: z.string().nullish(),
      isEbook: z.boolean().nullish(),
      listPrice: z
        .object({
          amount: z.number().nullish(),
          currencyCode: z.string().nullish(),
        })
        .nullish(),
      retailPrice: z
        .object({
          amount: z.number().nullish(),
          currencyCode: z.string().nullish(),
        })
        .nullish(),
      buyLink: z.string().nullish(),
    })
    .nullish(),

  accessInfo: z
    .object({
      country: z.string().nullish(),
      viewability: z.string().nullish(),
      embeddable: z.boolean().nullish(),
      publicDomain: z.boolean().nullish(),
      textToSpeechPermission: z.string().nullish(),
      epub: z
        .object({
          isAvailable: z.boolean().nullish(),
          downloadLink: z.string().nullish(),
          acsTokenLink: z.string().nullish(),
        })
        .nullish(),
      pdf: z
        .object({
          isAvailable: z.boolean().nullish(),
          downloadLink: z.string().nullish(),
          acsTokenLink: z.string().nullish(),
        })
        .nullish(),
      webReaderLink: z.string().nullish(),
      accessViewStatus: z.string().nullish(),
      downloadAccess: z
        .object({
          kind: z.string().nullish(),
          volumeId: z.string().nullish(),
          restricted: z.boolean().nullish(),
          deviceAllowed: z.boolean().nullish(),
          justAcquired: z.boolean().nullish(),
          maxDownloadDevices: z.number().nullish(),
          downloadsAcquired: z.number().nullish(),
          nonce: z.string().nullish(),
          source: z.string().nullish(),
          reasonCode: z.string().nullish(),
          message: z.string().nullish(),
          signature: z.string().nullish(),
        })
        .nullish(),
    })
    .nullish(),

  searchInfo: z
    .object({
      textSnippet: z.string().nullish(),
    })
    .nullish(),
})

export const GoogleBooksVolumesSchema = VolumeSchema.array()
export type GoogleBooksVolumesType = z.infer<typeof GoogleBooksVolumesSchema>
