import Worker from '../messaging/worker'
const { request } = Worker('download')

export const url = {
  github: (user: string, repo: string) => `https://github.com/${user}/${repo}/archive/master.zip`,
  vscode: (author: string, name: string, version = 'latest') => `https://${author}.gallery.vsassets.io/_apis/public/gallery/publisher/${author}/extension/${name}/${version}/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage`,
}

export const download = (url: string, path: string): Promise<boolean> => request.download(url, path)
